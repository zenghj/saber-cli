import path from 'path'

export function isLocalPath (templatePath) {
  return /^[./]|(^[a-zA-Z]:)/.test(templatePath)
}
export function getTemplatePath (templatePath) {
  return path.isAbsolute(templatePath)
  ? templatePath
  : path.normalize(path.join(process.cwd(), templatePath))
}