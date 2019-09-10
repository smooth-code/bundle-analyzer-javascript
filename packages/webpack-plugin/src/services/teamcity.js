export function detect() {
  return !!process.env.TEAMCITY_VERSION
}

export function config() {
  return {
    name: 'TeamCity CI',
    service: 'teamcity',
    commit: process.env.BUILD_VCS_NUMBER,
    branch: process.env.BRANCH_NAME,
    build: process.env.BUILD_NUMBER,
  }
}
