import userHome from 'user-home'
import path from 'path'
import packageJson from '../../package.json'

export const VERSION = packageJson.version
export const HOME = userHome
export const RC = path.join(HOME, '.saberrc')