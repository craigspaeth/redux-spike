import React from 'react'
import Radium from 'Radium'
import Chatbar from './chatbar'
let { html, body, main, script } = React.DOM

class Home extends React.Component {
  render () {
    return (
      html({},
        body({},
          main({ id: 'main' }, 'Hello World'),
          script({ src: 'index.js' }))))
  }
}

export default (props) => React.createElement(Radium(Home), props)
