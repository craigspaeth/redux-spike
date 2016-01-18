import path from 'path'
import express from 'express'
import React from 'react'
import babelify from 'babelify'
import { renderToString } from 'react-dom/server'
import rewire from 'rewire'
import socket from 'socket.io'
import http from 'http'
import sharify from 'sharify'
import esv from 'express-react-views'
import bdm from 'browserify-dev-middleware'
import createStore from 'store'
import _ from 'lodash'
import api from 'api'
import request from 'superagent'

let { PORT, NODE_ENV, API_URL } = process.env
let app = express()
let server = http.createServer(app)
let io = socket(server)

// Set up sharify
sharify.data = _.pick(process.env, 'DEBUG')
app.use(sharify)

// Hot reloading for server & client
let Layout
let Home
if (NODE_ENV == 'development') {
  app.use(bdm({ src: __dirname + '/client', intercept: (b) => {
    b.transform("babelify", { presets: ["es2015"] })
  }}))
  app.use((req, res, next) => {
    Layout = rewire('components/layout').default
    Home = rewire('components/home').default
    next()
  })
} else {
  Layout = require('components/layout')
  Home = require('components/home')
}

// Index route
app.get('/', (req, res, next) => {
  request.get(API_URL + '/chats').end((err, sres) => {
    if (err) return next(err)
    let store = createStore({ chats: sres.body })
    res.locals.sd.INITIAL_STATE = store.getState()
    res.send(renderToString(Layout({
      child: Home,
      title: 'Hi',
      store: store,
      sharify: res.locals.sharify
    })))
  })
})

// Start server & sockets
app.use('/api', api)
server.listen(PORT, () => console.log(`Listening on ${PORT}`))
io.on('connection', (socket) => {
  socket.on('SUBMIT_CHAT', ({ message, from }) => {
    request
      .post(API_URL + '/chats').send({ message: message, name: from })
      .end((err, res) => {
        request.get(API_URL + '/chats').end((err, res) => {
          if (!err) io.emit('NEW_CHATS', { chats: res.body })
        })
      })
  })
})
