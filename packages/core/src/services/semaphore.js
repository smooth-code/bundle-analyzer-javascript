export function detect() {
  return !!process.env.SEMAPHORE
}

export function config() {
  return {
    name: 'Semaphore CI',
    service: 'semaphore',
    branch: process.env.SEMAPHORE_GIT_BRANCH,
    build: process.env.SEMAPHORE_WORKFLOW_ID,
    commit: process.env.SEMAPHORE_GIT_SHA,
  }
}
