import cosmiconfig from 'cosmiconfig'

const explorer = cosmiconfig('bundle-analyzer', {
  sync: true,
  cache: true,
  rcExtensions: true,
})

export async function resolveConfig(searchFrom, configFile) {
  if (configFile == null) {
    const result = await explorer.search(searchFrom)
    return result ? result.config : null
  }
  const result = await explorer.load(configFile)
  return result ? result.config : null
}

export async function resolveConfigFile(filePath) {
  const result = await explorer.search(filePath)
  return result ? result.filepath : null
}

export function getToken(configToken) {
  const token = configToken || process.env.BUNDLE_ANALYZER_TOKEN
  if (!token) {
    throw new Error(
      `Token not found, please specify a token using BUNDLE_ANALYZER_TOKEN env variable`,
    )
  }
  return token
}

export function getApiUrl() {
  return (
    process.env.BUNDLE_ANALYZER_API_URL || 'https://api.bundle-analyzer.com'
  )
}
