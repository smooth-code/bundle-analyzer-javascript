/* eslint-disable no-console */
import program from 'commander'
import { uploadStats } from '@bundle-analyzer/core'
import pkg from '../package.json'

program
  .version(pkg.version)
  .usage('[options] <stats>')
  .option('--token <repository-token>', 'specify the repository token')
  .option('--config-file <file>', 'specify a custom config file')

program.on('--help', () => {
  console.log(`
  Examples:
    webpack --json | bundle-analyzer --token "your-repository-token"
    cat webpack-stats.json | bundle-analyzer --token "your-repository-token"
`)
})

program.parse(process.argv)

async function readStdin() {
  return new Promise((resolve, reject) => {
    let stdin = ''

    process.stdin.setEncoding('utf8')
    process.stdin.on('readable', () => {
      const chunk = process.stdin.read()
      if (chunk !== null) stdin += chunk
    })
    process.stdin.on('error', reject)
    process.stdin.on('end', () => resolve(stdin))
  })
}

async function run() {
  const rawStats = await readStdin()
  const stats = JSON.parse(rawStats)
  await uploadStats({
    webpackStats: stats,
    token: program.token,
    configFile: program.configFile,
  })
}

run().catch(error => {
  setTimeout(() => {
    throw error
  })
})
