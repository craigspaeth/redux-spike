import express from 'express'
import _ from 'lodash'
import bodyParser from 'body-parser'

let app = express()
let db = { chats: [] }

app.use(bodyParser.urlencoded(), bodyParser.json())

app.post('/chats', (req, res, next) => {
  setTimeout(() => {
    let chat = _.pick(req.body, 'message', 'name')
    db.chats.push(chat)
    res.send(chat)
  }, 300)
})

app.get('/chats', (req, res, next) => {
  setTimeout(() => {
    res.send(db.chats)
  }, 300)
})

export default app
