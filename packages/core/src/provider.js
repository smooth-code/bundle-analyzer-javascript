/* eslint-disable no-console */
import services from './services'
import * as localGit from './services/localGit'

export function detectProvider() {
  const service = services.find(service => service.detect())
  if (service) {
    const config = service.config()
    return config
  }

  const config = localGit.config()
  if (!config) {
    throw new Error('Unknown CI service provider. Unable to upload stats.')
  }
  return config
}
