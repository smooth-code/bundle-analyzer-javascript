/* eslint-disable import/no-extraneous-dependencies */
import path from 'path'
import webpack from 'webpack'
import MemoryFs from 'memory-fs'
import { uploadStats } from '@bundle-analyzer/core'
import BundleAnalyzerPlugin from '.'

jest.mock('@bundle-analyzer/core')

const memoryFs = new MemoryFs()

function compile() {
  const compiler = webpack({
    mode: 'production',
    context: path.join(__dirname, '../__fixtures__'),
    entry: './main.js',
    output: {
      path: path.join(__dirname, '../__fixtures__/build'),
      filename: 'bundle.js',
    },
    plugins: [new BundleAnalyzerPlugin({ token: 'repo-token' })],
  })

  compiler.outputFileSystem = memoryFs

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err)
      } else {
        resolve(stats)
      }
    })
  })
}

describe('webpack plugin', () => {
  beforeEach(() => {
    uploadStats.mockImplementation(async () => {})
  })

  it('call API with stats', async () => {
    await compile()
    const [[{ fileSystem, token, webpackStats }]] = uploadStats.mock.calls
    expect(fileSystem).toBe(memoryFs)
    expect(token).toBe('repo-token')
    expect(webpackStats.assets).toBeDefined()
  })
})
