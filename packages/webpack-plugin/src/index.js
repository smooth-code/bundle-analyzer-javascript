import { uploadStats } from '@bundle-analyzer/core'

class BundleAnalyzer {
  constructor({ token, configFile } = {}) {
    this.token = token
    this.configFile = configFile
  }

  apply(compiler) {
    const isProductionLikeMode =
      compiler.options.mode === 'production' || !compiler.options.mode
    if (!isProductionLikeMode) return

    const { token, configFile } = this

    compiler.hooks.afterEmit.tapAsync(
      '@bundle-analyzer/webpack-plugin',
      (hookCompiler, callback) => {
        const stats = hookCompiler.getStats().toJson({
          maxModules: Infinity,
          source: false,
        })

        uploadStats({
          webpackStats: stats,
          token,
          configFile,
          fileSystem: compiler.outputFileSystem,
        })
          .then(() => callback())
          .catch(error => {
            callback(new Error(`Bundle Analyzer - ${error.message}`))
          })
      },
    )
  }
}

module.exports = BundleAnalyzer
module.exports.default = BundleAnalyzer
