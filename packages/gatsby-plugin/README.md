# @bundle-analyzer/gatsby-plugin

Official Gatsby plugin for with [Bundle Analyzer service](https://www.bundle-analyzer.com).

## Install

```
npm install --save-dev @bundle-analyzer/gatsby-plugin
```

## Usage

**gatsby-config.js**

```js
plugins: [
  {
    resolve: '@bundle-analyzer/gatsby-plugin',
    options: { token: '<repository-token>' },
  },
]
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
