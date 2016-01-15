import path from 'path'
import express from 'express'
import React from 'react'
import bdm from 'browserify-dev-middleware'
import babelify from 'babelify'
import { renderToString } from 'react-dom/server'
import hotload from './lib/hotload'

let app = express()
hotload('./components/home.js')

// app.use((req, res, next) => {
//   let paths = Object.keys(require.cache)
//     .filter((path) => !path.match('node_modules'))
//     .filter((path) => path.replace(__dirname, '').match(/^\/components/))
//   paths.forEach((p) => {
//     console.log(p)
//     delete require.cache[p]
//   })
//   next()
// })
app.use(bdm({ src: __dirname + '/client', intercept: (b) => {
  b.transform("babelify", {presets: ["es2015"]})
}}))
app.get('/', (req, res) => {
  res.send(renderToString(Home()))
})
app.listen(5000, () => console.log("Listening on 5000"))
