import React from 'react'

let { div, input } = React.DOM

class AuthModal extends React.Component {

  componentDidMount() {
    this.refs.input.focus()
  }

  submitName(e) {
    if (e.which != 13) return
    this.context.store.dispatch({
      type: 'SUBMIT_NAME',
      name: e.target.value
    })
    this.refs.input
  }

  render () {
    if (this.context.store.getState().closedAuthModal) {
      return div({})
    } else {
      return (
      div({ style: styles.background },
        div({ style: styles.modal },
          input({
            placeholder: 'Enter your name',
            onKeyUp: this.submitName.bind(this),
            ref: 'input'
          })))
      )
    }
  }
}
AuthModal.contextTypes = { store: React.PropTypes.object }

let styles = {
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.7)',
    zIndex: '2',
    textAlign: 'center'
  },
  modal: {
    background: 'white',
    width: `300px`,
    height: '200px',
    display: 'inline-block',
    marginTop: '50px'
  }
}

export default (props) => React.createElement(AuthModal, props)
