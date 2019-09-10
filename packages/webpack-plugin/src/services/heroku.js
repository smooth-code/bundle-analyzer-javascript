// https://devcenter.heroku.com/articles/heroku-ci

export function detect() {
  return !!process.env.HEROKU_TEST_RUN_ID
}

export function config() {
  return {
    name: 'heroku CI',
    service: 'heroku',
    build: process.env.HEROKU_TEST_RUN_ID,
    commit: process.env.HEROKU_TEST_RUN_COMMIT_VERSION,
    branch: process.env.HEROKU_TEST_RUN_BRANCH,
  }
}
