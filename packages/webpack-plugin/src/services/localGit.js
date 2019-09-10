import * as git from '../git'

export function config() {
  let branch = git.branch()
  if (branch === 'HEAD') {
    branch = 'master'
  }
  const head = git.head()
  return {
    name: 'git',
    commit: head,
    branch,
  }
}
