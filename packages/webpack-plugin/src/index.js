import { gzipSync } from 'zlib'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'
import axios from 'axios'
import gzipSize from 'gzip-size'
import brotliSize from 'brotli-size'
import { detectProvider } from './provider'
import { getToken, getApiUrl } from './config'

const readFile = promisify(fs.readFile)

async function sizeAssets(stats) {
  return Promise.all(
    stats.assets.map(async asset => {
      const fullPath = path.join(stats.outputPath, asset.name)
      const buffer = await readFile(fullPath)
      return {
        ...asset,
        gzipSize: await gzipSize(buffer),
        brotliSize: await brotliSize(buffer),
      }
    }),
  )
}

class BundleAnalyzer {
  constructor({ token } = {}) {
    this.token = getToken(token)
    this.metadata = detectProvider()
  }

  apply(compiler) {
    const isProductionLikeMode =
      compiler.options.mode === 'production' || !compiler.options.mode
    if (!isProductionLikeMode) {
      return
    }
    const { token, metadata } = this
    compiler.hooks.afterEmit.tapAsync(
      '@bundle-analyzer/webpack-plugin',
      (hookCompiler, callback) => {
        const apiUrl = getApiUrl()
        const stats = hookCompiler.getStats().toJson({
          maxModules: Infinity,
          source: false,
        })

        async function sendBuild() {
          const assets = await sizeAssets(stats)

          const { data: build } = await axios.post(`${apiUrl}/builds`, {
            token,
            branch: metadata.branch,
            commit: metadata.commit,
            providerMetadata: metadata,
            stats: {
              assets,
              chunksNumber: stats.chunks.length,
              modulesNumber: stats.modules.length,
              assetsNumber: stats.assets.length,
            },
          })

          await axios.request({
            method: 'put',
            url: build.webpackStatsPutUrl,
            data: gzipSync(Buffer.from(JSON.stringify(stats))),
            headers: {
              'content-encoding': 'gzip',
            },
            maxContentLength: 30 * 1024 * 1024,
          })

          await axios.post(`${apiUrl}/builds/${build.id}/start`, {
            token,
          })
        }

        sendBuild()
          .then(() => callback())
          .catch(error => {
            function getMessage() {
              if (
                error.response &&
                error.response.data &&
                error.response.data.error &&
                error.response.data.error.message
              ) {
                return error.response.data.error.message
              }
              return error.message
            }
            callback(new Error(`Bundle Analyzer - ${getMessage()}`))
          })
      },
    )
  }
}

module.exports = BundleAnalyzer
module.exports.default = BundleAnalyzer
