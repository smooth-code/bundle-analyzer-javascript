export function detect() {
  return !!process.env.NOW_GITHUB_DEPLOYMENT
}

export function config() {
  return {
    name: 'ZEIT Now',
    service: 'now',
    commit: process.env.NOW_GITHUB_COMMIT_SHA,
    branch: process.env.NOW_GITHUB_COMMIT_REF,
  }
}
