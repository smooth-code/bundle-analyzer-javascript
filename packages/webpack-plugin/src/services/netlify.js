export function detect() {
  return !!process.env.NETLIFY
}

export function config() {
  return {
    name: 'Netlify',
    service: 'netlify',
    commit: process.env.COMMIT_REF,
    branch: process.env.BRANCH,
    build_url: process.env.DEPLOY_URL,
    root: process.env.WORKSPACE,
    pr: process.env.REVIEW_ID,
  }
}
