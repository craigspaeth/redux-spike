import React from 'react'
import Radium from 'Radium'
import Chatbar from './chatbar'
let { html, body, main, script } = React.DOM

console.log('load')

class Home extends React.Component {
  render () {
    return (
      html({},
        body({},
          main({ id: 'main' }, 'Hello Worldz'),
          Chatbar({}),
          script({ src: 'index.js' }))))
  }
}

export default (props) => React.createElement(Radium(Home), props)
