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
