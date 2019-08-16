import { getConfig, get, set, reset } from '../utils/rc'
export default async function config(action, key, value) {
  switch (action) {
    case 'get': 
      if (key) {
        console.log(await get(key))
      } else {
        const config = await getConfig()
        console.log(JSON.stringify(config, null, 2))
      }
      break;
    case 'set':
      set(key, value)
      break
    case 'reset':
      reset()
      break
    default:
      console.log('unknown config action!')
  }
}