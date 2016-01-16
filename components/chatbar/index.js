import React from 'react'
import Radium from 'Radium'
import store from 'store'

let { input, div } = React.DOM

class Chatbar extends React.Component {

  render () {
    return (
      div({ style: Object.assign({}, styles.divinput, styles.div) },
        input({
          style: Object.assign({}, styles.divinput, styles.input),
          placeholder: 'Type in a chat',
          onKeyUp: this.submitChat,
          ref: 'input' }))
    )
  }

  componentDidMount() {
    this.refs.input.focus()
  }

  submitChat(e) {
    if (e.which != 13) return
    store.dispatch({ type: 'SUBMIT_CHAT', message: e.target.value })
    this.refs.input.focus()
  }
}

let styles = {
  divinput: {
    height: '50px'
  },
  div: {
    width: '100%',
    position: 'absolute',
    bottom: '0',
    left: '0',
    padding: '10px'
  },
  input: {
    width: 'calc(100% - 20px)'
  }
}

export default (props) => React.createElement(Radium(Chatbar), props)
