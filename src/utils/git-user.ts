import { execSync } from 'child_process'

/**
 * @return "userName<userEmail>"
 */
export default function getGitUser():string {
  const user = getGitUserInfo()
  return (user.name || '') + (user.email ? `<${user.email}>` : '')
}

interface GitUser {
  name: string;
  email: string;
}
function getGitUserInfo():GitUser {
  let name:string
  let email:string
  
  try {
    const nameBuffer: Buffer = execSync('git config --get user.name')
    const emailBuffer: Buffer = execSync('git config --get user.email')
    name = nameBuffer && nameBuffer.toString().trim()
    email = emailBuffer && `${emailBuffer.toString().trim()}`
  } catch (e) {}
  return {
    name,
    email
  }
}