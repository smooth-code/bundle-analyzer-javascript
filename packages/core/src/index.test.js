/* eslint-disable import/no-extraneous-dependencies */
import path from 'path'
import nock from 'nock'
import webpack from 'webpack'
import MemoryFs from 'memory-fs'

import { uploadStats } from '.'

const memoryFs = new MemoryFs()

async function getWebpackStats() {
  const compiler = webpack({
    mode: 'production',
    context: path.join(__dirname, '../__fixtures__'),
    entry: './main.js',
    output: {
      path: path.join(__dirname, '../__fixtures__/build'),
      filename: 'bundle.js',
    },
  })

  compiler.outputFileSystem = memoryFs

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err)
      } else {
        resolve(stats.toJson())
      }
    })
  })
}

describe('#uploadStats', () => {
  beforeEach(() => {
    process.env.NETLIFY = 'true'
    process.env.COMMIT_REF = 'commit'
    process.env.HEAD = 'branch'
    process.env.DEPLOY_URL = 'deploy-url'
    process.env.REVIEW_ID = 'review-id'
  })

  it('builds assets', async () => {
    const stats = await getWebpackStats()
    const bundlesScope = nock('https://api.bundle-analyzer.com')
      .post('/bundles', {
        token: 'bundle-analyzer-token',
        bundler: 'webpack',
        stats: {
          assets: [
            {
              name: 'bundle.js',
              size: 957,
              chunks: [0],
              chunkNames: ['main'],
              info: {},
              isOverSizeLimit: {},
              emitted: true,
              gzipSize: 469,
              brotliSize: 412,
            },
          ],
          chunksNumber: 1,
          modulesNumber: 1,
          assetsNumber: 1,
        },
      })
      .reply(201, {
        webpackStatsPutUrl: 'https://aws.s3.com/webpack-stats',
        id: 'bundle-id',
      })

    const s3Scope = nock('https://aws.s3.com')
      .put('/webpack-stats')
      .reply(201)

    const buildsScope = nock('https://api.bundle-analyzer.com')
      .post('/builds', {
        token: 'bundle-analyzer-token',
        bundleId: 'bundle-id',
        branch: 'branch',
        commit: 'commit',
        providerMetadata: {
          name: 'Netlify',
          service: 'netlify',
          commit: 'commit',
          branch: 'branch',
          build_url: 'deploy-url',
          pr: 'review-id',
        },
      })
      .reply(201)

    await uploadStats({
      webpackStats: stats,
      fileSystem: memoryFs,
      token: 'bundle-analyzer-token',
    })

    bundlesScope.done()
    s3Scope.done()
    buildsScope.done()
  })
})
