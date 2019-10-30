import semver from 'semver'
import logger from './logger'

export default function nodeEngineGuard(versionRequirement: string, done: () => any) {
  if (semver.satisfies(process.version, versionRequirement)) {
    return done()
  }
  logger.fatal(`Your node engine version must ${versionRequirement}. Current version is ${process.version}!`)
}