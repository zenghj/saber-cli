import path from 'path'

export function isLocalPath (templatePath: string): boolean {
  return /^[./]|(^[a-zA-Z]:)/.test(templatePath)
}
export function getTemplatePath (templatePath: string): string {
  return path.isAbsolute(templatePath)
  ? templatePath
  : path.normalize(path.join(process.cwd(), templatePath))
}