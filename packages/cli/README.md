# @bundle-analyzer/cli

Official CLI compatible with [Bundle Analyzer service](https://www.bundle-analyzer.com).

## Install

```
npm install --save-dev @bundle-analyzer/cli
```

## Usage

```
Usage: bundle-analyzer [options] <stats>

Options:
  -V, --version               output the version number
  --token <repository-token>  specify the repository token
  --config-file <file>        specify a custom config file
  -h, --help                  output usage information

  Examples:
    webpack --json | bundle-analyzer --token "your-repository-token"
    cat webpack-stats.json | bundle-analyzer --token "your-repository-token"
```

## Complete documentation

👉 [See full documentation](https://docs.bundle-analyzer.com/)

## License

MIT
