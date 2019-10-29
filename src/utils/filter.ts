import evaluate from './eval'
import match from 'minimatch'
import { MetaFilters, MetalSmithFiles, MetaData, CallbackFunction } from '../index.d'
import logger from './logger'

export default function filter(filters: MetaFilters, files: MetalSmithFiles, data: MetaData, done: CallbackFunction) {
  if (!filters) {
    return done()
  }
  const fileNames = Object.keys(files)
  Object.keys(filters).forEach(glob => {
    fileNames.forEach(file => {
      if (match(file, glob, {
        dot: true
      })) {
        const condition = filters[glob]
        const valid = evaluate(condition, data)
        logger.debug('condition valid', valid)
        if (!valid) {
          logger.debug('delete file', file)
          delete files[file]
        }
      }
    })
  })
  done()
}