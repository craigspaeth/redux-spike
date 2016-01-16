import React from 'react'
import Radium from 'Radium'
import Chatbar from 'components/chatbar'
let { html, body, main, script } = React.DOM

class Home extends React.Component {
  render () {
    return (
      html({},
        body({},
          main({ id: 'main' }, this.props.title),
          script({ src: 'index.js' }))))
  }
}

export default (props) => React.createElement(Radium(Home), props)
