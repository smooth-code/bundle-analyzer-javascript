import zlib from 'zlib'
import { promisify } from 'util'
import path from 'path'
import fs from 'fs'
import axios from 'axios'
import gzipSize from 'gzip-size'
import brotliSize from 'brotli-size'
import omitDeep from 'omit-deep'
import { detectProvider } from './provider'
import { resolveConfig, getToken, getApiUrl } from './config'

const gzip = promisify(zlib.gzip)

async function sizeAssets(webpackStats, { fileSystem = fs } = {}) {
  const readFile = promisify(fileSystem.readFile.bind(fileSystem))
  return Promise.all(
    webpackStats.assets.map(async asset => {
      const fullPath = path.join(webpackStats.outputPath, asset.name)
      const buffer = await readFile(fullPath)
      return {
        ...asset,
        gzipSize: await gzipSize(buffer),
        brotliSize: await brotliSize(buffer),
      }
    }),
  )
}

function getErrorMessage(error) {
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

export async function uploadStats({
  context = process.cwd(),
  configFile,
  webpackStats,
  token: optionToken,
  fileSystem,
}) {
  try {
    const token = getToken(optionToken)
    const apiUrl = getApiUrl()
    const metadata = detectProvider()
    const stats = omitDeep(webpackStats, 'source')
    const config = await resolveConfig(context, configFile)
    const assets = await sizeAssets(stats, { fileSystem })

    const { data: bundle } = await axios.post(`${apiUrl}/bundles`, {
      token,
      bundler: 'webpack',
      stats: {
        assets,
        chunksNumber: stats.chunks.length,
        modulesNumber: stats.modules.length,
        assetsNumber: stats.assets.length,
      },
    })

    const data = await gzip(Buffer.from(JSON.stringify(stats)))

    await axios.request({
      method: 'put',
      url: bundle.webpackStatsPutUrl,
      data,
      headers: {
        'content-encoding': 'gzip',
      },
      maxContentLength: 30 * 1024 * 1024,
    })

    await axios.post(`${apiUrl}/builds`, {
      token,
      bundleId: bundle.id,
      branch: metadata.branch,
      commit: metadata.commit,
      providerMetadata: metadata,
      config,
    })
  } catch (error) {
    throw new Error(getErrorMessage(error))
  }
}
