import RC from '../utils/rc'
import { ActionMethod, Command } from '../index.d'

const rc = RC.getInstance()

const configAction: ActionMethod = async function config(program: Command, action: string, key: string, value: any) {
  switch (action) {
    case 'get': 
      if (key) {
        console.log(await rc.get(key))
      } else {
        const config = await rc.getConfig()
        console.log(JSON.stringify(config, null, 2))
      }
      break;
    case 'set':
      rc.set(key, value)
      break
    case 'reset':
      rc.reset()
      break
    default:
      console.log('unknown config action!')
  }
}
export default configAction