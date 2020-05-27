// https://docs.gitlab.com/ce/ci/variables/README.html

export function detect() {
  return !!process.env.GITHUB_ACTIONS
}

export function config() {
  return {
    name: 'GitHub Actions',
    service: 'github',
    build: process.env.GITHUB_RUN_ID,
    commit: process.env.GITHUB_SHA,
    branch: process.env.GITHUB_HEAD_REF || (process.env.GITHUB_REF && process.env.GITHUB_REF.split('/')[2]),
    root: process.env.GITHUB_WORKSPACE,
    slug: process.env.GITHUB_REPOSITORY,
  }
}
