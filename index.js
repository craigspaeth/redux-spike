import path from 'path'
import express from 'express'
import React from 'react'
import bdm from 'browserify-dev-middleware'
import babelify from 'babelify'
import { renderToString } from 'react-dom/server'
import rewire from 'rewire'

let { PORT } = process.env
let app = express()

app.use(bdm({ src: __dirname + '/client', intercept: (b) => {
  b.transform("babelify", { presets: ["es2015"] })
}}))
app.get('/', (req, res) => {
  let Layout = rewire('./components/layout').default
  res.send(renderToString(Layout({ child: 'home', title: 'Hello World' })))
})
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
