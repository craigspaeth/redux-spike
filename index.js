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

let { PORT, NODE_ENV } = process.env
let app = express()
let server = http.createServer(app)
let io = socket(server)
let db = { chats: [] }

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
app.get('/', (req, res) => {
  let store = createStore(db)
  res.locals.sd.INITIAL_STATE = store.getState()
  res.send(renderToString(Layout({
    child: Home,
    title: 'Hi',
    store: store,
    sharify: res.locals.sharify
  })))
})

// Start server & sockets
server.listen(PORT, () => console.log(`Listening on ${PORT}`))
io.on('connection', (socket) => {
  socket.on('SUBMIT_CHAT', ({ message, from }) => {
    db.chats.push(`${from}: ${message}`)
    io.emit('NEW_CHATS', { chats: db.chats })
  })
})
