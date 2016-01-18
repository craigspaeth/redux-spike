import 'socket.io-client'
import Home from 'components/home'
import { render } from 'react-dom'
import createStore from 'store'
import { data as sd } from 'sharify'
import socket from './socket'
import _ from 'lodash'

let store = createStore(sd.INITIAL_STATE)

localStorage.debug = sd.DEBUG
render(Home({ title: 'Hi', store: store }), document.getElementById('main'))
socket.on('*', (event, data) => store.dispatch(_.assign({ type: event }, data)))
