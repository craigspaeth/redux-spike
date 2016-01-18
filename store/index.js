import { createStore } from 'redux'
import socket from 'client/socket'
import _ from 'lodash'
import { camelize } from 'underscore.string'
import d from 'debug'

let debug = d('redux')

let reducers = {
  SUBMIT_CHAT(state, action) {
    state.chats.push(state.currentUserName + ': ' + action.message)
    state.chatInputValue = ''
  },
  NEW_CHATS(state, action) {
    _.assign(state, { chats: action.chats })
  },
  SUBMIT_NAME(state, action) {
    state.currentUserName = action.name
    state.closedAuthModal = true
  },
  CHAT_KEYUP(state, action) {
    state.chatInputValue = action.value
  }
}

export default (initialState) => {
  return createStore((state = initialState, action) => {
    debug('action', action)
    debug('old state', state)
    if (socket) socket.emit(action.type, _.omit(action, 'type'))
    let fn = reducers[action.type]
    let s = _.clone(state)
    if (fn) fn(s, action)
    debug('new state', s)
    return s
  })
}
