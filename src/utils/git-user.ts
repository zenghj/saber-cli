import { execSync } from 'child_process'

/**
 * @return "gitUserName<gitUserEmail>"
 */
export default function getGitUser():string {
  let name:string
  let email:string
  
  try {
    const nameBuffer: Buffer = execSync('git config --get user.name')
    const emailBuffer: Buffer = execSync('git config --get user.email')
    name = nameBuffer && nameBuffer.toString().trim()
    email = emailBuffer && `<${emailBuffer.toString().trim()}>`
  } catch (e) {}
  
  return (name || '') + (email || '')
}
