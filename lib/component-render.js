import rewire from 'rewire'
import { renderToString } from 'react-dom/server'
import path from 'path'
let { NODE_ENV } = process.env
let r = NODE_ENV == 'production' ? require : rewire

export default (req, res, next) => {
  res.render = (templateName) => {
    let file = path.resolve(__dirname, `../components/${templateName}.js`)
    return res.send(renderToString(r(file).default()))
  }
  next()
}
