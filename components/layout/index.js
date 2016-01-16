import React from 'react'
import Radium from 'radium'
import Chatbar from 'components/chatbar'
import rewire from 'rewire'
import path from 'path'

let { html, body, main, script } = React.DOM
let { NODE_ENV } = process.env
let r = NODE_ENV == 'production' ? require : rewire

class Layout extends React.Component {
  render () {
    let fname = path.resolve(__dirname, '..', this.props.child)
    let comp = r(fname).default(this.props)
    return (
      html({},
        body({},
          main({ id: 'main' }, comp),
          script({ src: 'index.js' }))))
  }
}

export default (props) => React.createElement(Radium(Layout), props)
