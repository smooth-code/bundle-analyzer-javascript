import BundleAnalyzerPlugin from '@bundle-analyzer/webpack-plugin'

exports.onCreateWebpackConfig = ({ actions }, options) => {
  actions.setWebpackConfig({
    plugins: [new BundleAnalyzerPlugin(options)],
  })
}
