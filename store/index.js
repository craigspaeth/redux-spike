import { createStore } from 'redux'

let initialState = { chats: ['Hello'] }
let store = createStore((state = initialState, action) => {
  let s = Object.assign({}, state)
  switch (action.type) {
  case 'SUBMIT_CHAT':
    s.chats.push(action.message)
  }
  return s
})

export default store
