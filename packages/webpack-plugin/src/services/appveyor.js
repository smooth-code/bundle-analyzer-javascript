export function detect() {
  return !!process.env.APPVEYOR
}

export function config() {
  return {
    name: 'App Veyor',
    service: 'appveyor',
    commit: process.env.APPVEYOR_REPO_COMMIT,
    branch: process.env.APPVEYOR_REPO_BRANCH,
    pr: process.env.APPVEYOR_PULL_REQUEST_NUMBER,
    job: `${process.env.APPVEYOR_ACCOUNT_NAME}/${process.env.APPVEYOR_PROJECT_SLUG}/${process.env.APPVEYOR_BUILD_VERSION}`,
    build: process.env.APPVEYOR_JOB_ID,
    slug: process.env.APPVEYOR_REPO_NAME,
  }
}
