import async from 'async'
import multimatch from 'multimatch'
import consolidate from 'consolidate'
const render = consolidate.handlebars.render

export default function renderFiles(skips, files, data, done) {
  const fileNames = Object.keys(files)
  async.each(fileNames, (fileName, callback) => {
    if (multimatch([fileName], skips, {
      dot: true
    }).length) {
      return callback()
    }
    const str = files[fileName].contents.toString()
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