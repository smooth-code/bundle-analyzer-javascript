import { execSync } from 'child_process'

export function branch() {
  return execSync('git rev-parse --abbrev-ref HEAD || hg branch')
    .toString()
    .trim()
}

export function head() {
  return execSync("git log -1 --pretty=%H || hg id -i --debug | tr -d '+'")
    .toString()
    .trim()
}
