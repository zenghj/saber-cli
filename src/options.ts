class CommandOption {
  key: string;
  desc: string;
  constructor(key, desc) {
    this.key = key
    this.desc = desc
  }
  getKeys() {
    return this.key.split(',').map(k => k.trim())
  }
  getPropName() {
    return this.getKeys()[1].trim().replace('--', '')
  }
}

const commandOptions = [
  new CommandOption('-c, --clone', 'use git clone'),
  new CommandOption(
    '-p, --private',
    'directly git clone from private repository, make sure you have access to the repository'
  )
]
const availableOptions = commandOptions.reduce((sum, option) => {
  sum.push(...option.getKeys())
  return sum
}, [])

export function getCommandOptions() {
  return [...commandOptions]
}

export function getAvailableOptionKeys() {
  return [...availableOptions]
}

export function getAvailableOptionNames() {
  return commandOptions.map(o => o.getPropName())
}