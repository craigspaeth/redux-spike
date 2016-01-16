import React from 'react'
import Chatbar from 'components/chatbar'
import store from 'store'

let { div, li, ul } = React.DOM

class Home extends React.Component {

  constructor() {
    super()
   this.state = store.getState()
  }

  componentDidMount() {
    store.subscribe(() => this.setState(store.getState()))
  }

  render () {
    return div({},
      ul({}, this.state.chats.map((chat) => li({}, chat))),
      Chatbar({}))
  }
}

export default (props) => React.createElement(Home, props)
