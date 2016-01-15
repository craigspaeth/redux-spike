import React from 'react'
import Radium from 'Radium'
import Chatbar from './chatbar'
let { html, body, main, script } = React.DOM

class Layout extends React.Component {
  render () {
    let fname = __dirname + '/' + this.props.child + '.js'
    let comp = require().default(this.props)
    console.log(comp)
    return (
      html({},
        body({},
          main({ id: 'main' }, comp),
          script({ src: 'index.js' }))))
  }
}

export default (props) => React.createElement(Radium(Layout), props)
