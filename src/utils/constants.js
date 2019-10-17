import userHome from 'user-home'
import path from 'path'
import packageJson from '../../package.json'

export const VERSION = packageJson.version
export const HOME = userHome
export const RC = path.join(HOME, '.saberrc')
export const __DEV__ = process.env.NODE_ENV === 'development'
export const __PROD__ = process.env.NODE_ENV === 'production' || !process.env.NODE_ENV