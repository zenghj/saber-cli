import { RCFilePath } from './constants'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import inquirer from 'inquirer'
import logger from './logger'

const registerKey = 'registry'
const DEFAULT_CONFIG = Object.freeze({
  v: 1,
  registries: ['saber-cli-templates'],
  currentRegistryIndex: 0
})

const CONFIG_KEYS = Object.keys(DEFAULT_CONFIG)

interface RCConfig {
  v: number,
  // registry: string;
  registries: string[];
  currentRegistryIndex: number;
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
  private protectedConfigKeys = ['v', 'registries', 'currentRegistryIndex'];
  private setableKeys = [...CONFIG_KEYS, registerKey].filter(item => !this.protectedConfigKeys.includes(item));
  static getInstance():RC {
    if (RC.instance == null) {
      RC.instance = new RC();
    } 
    return RC.instance; 
  }
  getConfig():RCConfig  {
    const config = getRCConfig() 
    return config || JSON.parse(JSON.stringify(DEFAULT_CONFIG))
  }
  get(key: string) {
    if (key === registerKey) return this.getRegistry()
    const config = this.getConfig() 
    return config ? config[key] : ''
  }
  set(key: string, value) {
    if (!key) return console.error('key is required!')
    if (!this.setableKeys.includes(key)) return console.error(`available keys: "${this.setableKeys.join(',')}" `)
    const config = this.getConfig()
    if (key === registerKey) {
      if (value == null) {
        return console.log('value can\'t be empty!')
      }
      if (config.registries.includes(value)) {
        config.currentRegistryIndex = config.registries.indexOf(value);
      } else {
        config.registries.push(value)
        config.currentRegistryIndex = config.registries.length - 1
      }
    } else {
      config[key] = value
    }
    console.log(config)
    return this.saveConfig(config)
  }
  reset() {
    return this.saveConfig(DEFAULT_CONFIG)
  }
  saveConfig(config) {
    return writeFileSync(RCFilePath, JSON.stringify(config, null, 2))
  }
  selectRegistry() {
    const config = this.getConfig() 
    const registries = config.registries || [];
    const choices = registries.map((r, index) => ({
      value: index,
      name: r
    }))
    // console.log(choices, config.currentRegistryIndex)
    inquirer.prompt(
      {
        type: 'list',
        name: 'currentRegistryIndex',
        default: config.currentRegistryIndex,
        choices: choices,
        message: 'select a template registry'
      }
    ).then(answers => {
      logger.debug(answers)
      if (answers && answers.currentRegistryIndex !== undefined && 
        answers.currentRegistryIndex !== config.currentRegistryIndex) {
          config.currentRegistryIndex = answers.currentRegistryIndex
          this.saveConfig(config)
        }
    })
  }
  private getDefaultRegistry() {
    return DEFAULT_CONFIG.registries[DEFAULT_CONFIG.currentRegistryIndex];
  }
  getRegistry() {
    const config = this.getConfig() 
    return config.registries[config.currentRegistryIndex] || this.getDefaultRegistry()
  }
}
