import fs from 'fs'
import path from 'path'
import { transformFileSync } from 'babel-core'

export default (filename) => {
  let file = path.resolve(path.dirname(module.parent.filename), filename)
  let code = transformFileSync(file, {presets: ["es2015"]}).code
  eval(code)
}
