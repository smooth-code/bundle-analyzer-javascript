export function detect() {
  return process.env.CI_NAME && process.env.CI_NAME === 'codeship'
}

export function config() {
  return {
    name: 'Codeship',
    service: 'codeship',
    build: process.env.CI_BUILD_NUMBER,
    build_url: process.env.CI_BUILD_URL,
    commit: process.env.CI_COMMIT_ID,
    branch: process.env.CI_BRANCH,
  }
}
