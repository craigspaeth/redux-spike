import React from 'react'
import Chatbar from 'components/chatbar'
import AuthModal from 'components/auth-modal'

let { div, li, ul } = React.DOM

class Home extends React.Component {

  getChildContext() {
    return { store: this.props.store }
  }

  constructor({ store }) {
    super()
    this.state = store.getState()
  }

  componentDidMount() {
    this.props.store.subscribe(() => {
      this.setState(this.props.store.getState())
    })
  }

  render () {
    return (
    div({},
      AuthModal({}),
      ul({}, this.state.chats.map((chat, i) => {
        return li({ key: i }, chat.name + ': ' + chat.message)
      })),
      Chatbar({}))
    )
  }
}
Home.childContextTypes = { store: React.PropTypes.object }

export default (props) => React.createElement(Home, props)
