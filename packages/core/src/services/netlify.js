export function detect() {
  return !!process.env.NETLIFY
}

export function config() {
  return {
    name: 'Netlify',
    service: 'netlify',
    commit: process.env.COMMIT_REF,
    branch: process.env.HEAD,
    build_url: process.env.DEPLOY_URL,
    pr: process.env.REVIEW_ID,
  }
}
