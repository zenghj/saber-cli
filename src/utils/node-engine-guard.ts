import semver from 'semver'
import { pkgJson } from './constants'

import logger from './logger'
export default function nodeEngineGuard(versionRequirement: string, done: () => any) {
  if (semver.satisfies(process.version, versionRequirement)) {
    return done()
  }
  logger.fatal(`Your node engine version must ${versionRequirement}`)
}