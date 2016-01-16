import path from 'path'
import express from 'express'
import React from 'react'
import bdm from 'browserify-dev-middleware'
import babelify from 'babelify'
import Layout from 'components/layout'
import { renderToString } from 'react-dom/server'

let { PORT } = process.env
let app = express()

app.use(bdm({ src: __dirname + '/client', intercept: (b) => {
  b.transform("babelify", {presets: ["es2015"]})
}}))
app.get('/', (req, res) => {
  res.send(renderToString(Layout({ child: 'home', title: 'Hello World' })))
})
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
