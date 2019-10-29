import { ActionMethod, Command } from './index.d'
export default function apply(program: Command, actionName: string, ...args) {
  const action: ActionMethod = require(`./actions/${actionName}`).default
  action(program, ...args)
}