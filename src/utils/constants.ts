import userHome from 'user-home'
import * as path from 'path'
import packageJson from '../../package.json'

export enum Env {
  dev = 'development',
  prod = 'production',
  test = 'test'
}
export const VERSION:string = packageJson.version
export const HOME:string = userHome
export const RCFilePath:string = path.join(HOME, '.saberrc')
export const __DEV__:boolean = process.env.NODE_ENV === Env.dev
export const __PROD__:boolean = process.env.NODE_ENV === Env.prod || !process.env.NODE_ENV
export const pkgJson = Object.assign({}, packageJson)
