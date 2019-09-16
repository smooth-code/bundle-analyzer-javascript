# @bundle-analyzer/webpack-plugin

Official webpack plugin compatible with [Bundle Analyzer service](https://www.bundle-analyzer.com).

## Install

```
npm install --save-dev @bundle-analyzer/webpack-plugin
```

## Usage

**webpack.config.js**

```js
const BundleAnalyzerPlugin = require('@bundle-analyzer/webpack-plugin')

module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js',
  },
  plugins: [new BundleAnalyzerPlugin({ token: 'Your repository token' })],
}
```

## Options

### token

You can specify the token using options or environment variable `BUNDLE_ANALYZER_TOKEN`.

### configFile

You can specify a custom configuration file.

## Complete documentation

👉 [See full documentation](https://docs.bundle-analyzer.com/)

## License

MIT
