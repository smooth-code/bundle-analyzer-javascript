# @bundle-analyzer/core

Official Node.js package compatible with [Bundle Analyzer service](https://www.bundle-analyzer.com).

## Install

```
npm install --save-dev @bundle-analyzer/core
```

## Usage

```js
import { uploadStats } from '@bundle-analyzer/core'
import webpackStats from './webpack-stats.json'

uploadStats({ webpackStats, token: '<repository-token>' })
  .then(() => {
    console.log('uploaded)
  })
```

## Options

### webpackStats

Stats generated from webpack.

### token

You can specify the token using options or environment variable `BUNDLE_ANALYZER_TOKEN`.

### fileSystem

Custom filesystem.

### context

Search the config file from this repository.

### configFile

Specify a custom config file.

## Complete documentation

👉 [See full documentation](https://docs.bundle-analyzer.com/)

## License

MIT
