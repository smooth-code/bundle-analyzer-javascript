export function detect() {
  return !!process.env.TRAVIS
}

export function config() {
  return {
    name: 'Travis CI',
    service: 'travis',
    commit: process.env.TRAVIS_COMMIT,
    build: process.env.TRAVIS_JOB_NUMBER,
    branch: process.env.TRAVIS_BRANCH,
    job: process.env.TRAVIS_JOB_ID,
    pr: process.env.TRAVIS_PULL_REQUEST,
    slug: process.env.TRAVIS_REPO_SLUG,
    root: process.env.TRAVIS_BUILD_DIR,
  }
}
