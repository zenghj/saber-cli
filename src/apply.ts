import { ActionMethod } from './index.d'
export default function apply(program, actionName, ...args) {
  const action: ActionMethod = require(`./actions/${actionName}`).default
  action(program, ...args)
}