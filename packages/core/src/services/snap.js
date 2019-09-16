export function detect() {
  return !!process.env.SNAP_CI
}

export function config() {
  return {
    name: 'Snap CI',
    service: 'snap',
    build: process.env.SNAP_PIPELINE_COUNTER,
    commit: process.env.SNAP_COMMIT || process.env.SNAP_UPSTREAM_COMMIT,
    branch: process.env.SNAP_BRANCH || process.env.SNAP_UPSTREAM_BRANCH,
    pr: process.env.SNAP_PULL_REQUEST_NUMBER,
  }
}
