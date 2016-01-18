import React from 'react'

let { input, div } = React.DOM

class Chatbar extends React.Component {

  componentDidUpdate() {
    if (this.context.store.getState().closedAuthModal) this.refs.input.focus()
  }

  onKeyUp(e) {
    if (e.which != 13) return
    this.context.store.dispatch({
      type: 'SUBMIT_CHAT',
      message: e.target.value,
      from: this.context.store.getState().currentUserName
    })
    this.refs.input.focus()
  }

  onChange(e) {
    this.context.store.dispatch({
      type: 'CHAT_KEYUP',
      value: this.refs.input.value
    })
  }

  render () {
    return (
      div({ style: Object.assign({}, styles.divinput, styles.div) },
        input({
          style: Object.assign({}, styles.divinput, styles.input),
          placeholder: 'Type in a chat',
          onChange: this.onChange.bind(this),
          onKeyUp: this.onKeyUp.bind(this),
          value: this.context.store.getState().chatInputValue,
          ref: 'input' }))
    )
  }
}
Chatbar.contextTypes = { store: React.PropTypes.object }

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

export default (props) => React.createElement(Chatbar, props)
