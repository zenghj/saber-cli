import evaluate from './eval'
import match from 'minimatch'
import { MetaFilters, MetalSmithFiles, MetaData, CallbackFunction } from '../index.d'

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
        if (!evaluate(condition, data)) {
          delete files[file]
        }
      }
    })
  })
}