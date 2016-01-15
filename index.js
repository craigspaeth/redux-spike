import path from 'path'
import express from 'express'
import React from 'react'
import bdm from 'browserify-dev-middleware'
import babelify from 'babelify'
import componentRender from './lib/component-render'

let app = express()

app.use(componentRender)
app.use(bdm({ src: __dirname + '/client', intercept: (b) => {
  b.transform("babelify", {presets: ["es2015"]})
}}))
app.get('/', (req, res) => {
  res.render('home')
})
app.listen(5000, () => console.log("Listening on 5000"))
