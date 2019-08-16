import { RC } from './constants'
import { existsSync, readFileSync, writeFileSync } from 'fs'

const DEFAULT = Object.freeze({
  registry: 'saber-cli-templates'
})

const CONFIG_KEYS = Object.keys(DEFAULT)

function getRCConfig() {
  if (!existsSync(RC)) return null
  let config = readFileSync(RC, { encoding: 'utf-8' })
  config = JSON.parse(config)
  return config
}

export function getConfig() {
  const config = getRCConfig() 
  return config || DEFAULT
}

export function get(key) {
  const config = getRCConfig() 
  return config ? config[key] : ''
}

export function set(key, value) {
  if (!key) return console.error('key is required!')
  if (!CONFIG_KEYS.includes(key)) return console.error(`available keys: "${CONFIG_KEYS.join(',')}" `)
  const config = getRCConfig() || {}
  config[key] = value
  console.log(config[key])
  return writeFileSync(RC, JSON.stringify(config, null, 2))
}

export function reset() {
  return writeFileSync(RC, JSON.stringify(DEFAULT, null, 2))
}