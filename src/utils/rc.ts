import { RCFilePath } from './constants'
import { existsSync, readFileSync, writeFileSync } from 'fs'

const DEFAULT = Object.freeze({
  registry: 'saber-cli-templates'
})

const CONFIG_KEYS = Object.keys(DEFAULT)

interface RCConfig {
  registry: string;
  [propName: string]: any
}

function getRCConfig(): RCConfig {
  if (!existsSync(RCFilePath)) return null
  const configStr = readFileSync(RCFilePath, { encoding: 'utf-8' })
  const config = JSON.parse(configStr)
  return config
}

export default class RC {
  private static instance: RC;
  static getInstance():RC {
    if (RC.instance == null) {
      RC.instance = new RC();
    } 
    return RC.instance; 
  }
  getConfig() {
    const config = getRCConfig() 
    return config || DEFAULT
  }
  get(key: string) {
    const config = getRCConfig() 
    return config ? config[key] : ''
  }
  set(key: string, value) {
    if (!key) return console.error('key is required!')
    if (!CONFIG_KEYS.includes(key)) return console.error(`available keys: "${CONFIG_KEYS.join(',')}" `)
    const config = getRCConfig() || {}
    config[key] = value
    console.log(config[key])
    return writeFileSync(RCFilePath, JSON.stringify(config, null, 2))
  }
  reset() {
    return writeFileSync(RCFilePath, JSON.stringify(DEFAULT, null, 2))
  }
}
