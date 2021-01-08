import async from 'async'
import multimatch from 'multimatch'
import consolidate from 'consolidate'
import logger from './logger'
const render = consolidate.handlebars.render

export default function renderFiles(skips, files, data, done) {
  const fileNames = Object.keys(files)
  logger.debug('renderFiles', 'fileNames', fileNames, 'skips', skips )
  async.each(fileNames, (fileName, callback) => {
    // skip specific files
    if (multimatch([fileName], skips, {
      dot: true
    }).length) {
      return callback()
    }
    const str = files[fileName].contents.toString()
    // skip file with no handlebar syntax
    if (!/{{([^{}]+)}}/g.test(str)) {
      return callback()
    }
    render(str, data, (err, res) => {
      if (err) {
        err.message = `[${fileName}] ${err.message}`
        return callback(err)
      }
      files[fileName].contents = Buffer.from(res)
      callback()
    })
  }, done)
}