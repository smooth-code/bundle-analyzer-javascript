export function detect() {
  return !!process.env.CIRRUS_CI
}

export function config() {
  return {
    name: 'Cirrus CI',
    service: 'cirrusci',
    build: process.env.CIRRUS_BUILD_ID,
    job: process.env.CIRRUS_TASK_ID,
    commit: process.env.CIRRUS_CHANGE_IN_REPO,
    branch: process.env.CIRRUS_BRANCH,
    pr: process.env.CIRRUS_PR,
    slug: process.env.CIRRUS_REPO_FULL_NAME,
  }
}
