export function detect() {
  return !!process.env.BUILDKITE
}

export function config() {
  // https://buildkite.com/docs/guides/environment-variables
  return {
    name: 'Buildkite',
    service: 'buildkite',
    build: process.env.BUILDKITE_BUILD_NUMBER,
    build_url: process.env.BUILDKITE_BUILD_URL,
    commit: process.env.BUILDKITE_COMMIT,
    branch: process.env.BUILDKITE_BRANCH,
    slug: process.env.BUILDKITE_PROJECT_SLUG,
  }
}
