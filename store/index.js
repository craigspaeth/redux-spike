import { createStore } from 'redux'
import socket from 'client/socket'
import _ from 'lodash'
import { camelize } from 'underscore.string'

let reducers = {
  submitChat(state, action) {
    state.chats.push(action.message)
  },
  setState(state, action) {
    _.assign(state, action.state)
  }
}

export default (initialState) => {
  return createStore((state = initialState, action) => {
    if (socket) socket.emit(action.type, _.omit(action, 'type'))
    let fn = reducers[camelize(action.type.toLowerCase())]
    let s = _.clone(state)
    if (fn) fn(s, action)
    return s
  })
}
