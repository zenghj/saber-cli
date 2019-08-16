export default function apply(program, actionName, ...args) {
  const action = require(`./actions/${actionName}`).default
  action.apply(program, args)
}