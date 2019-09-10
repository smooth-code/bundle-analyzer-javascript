import { head } from '../git'

export function detect() {
  return !!process.env.DRONE
}

export function config() {
  return {
    name: 'Drone.io',
    service: 'drone.io',
    build: process.env.DRONE_BUILD_NUMBER,
    commit: head(),
    build_url: process.env.DRONE_BUILD_URL,
    branch: process.env.DRONE_BRANCH,
    root: process.env.DRONE_BUILD_DIR,
  }
}
