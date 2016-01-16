import React from 'react'
import rewire from 'rewire'
import path from 'path'
import reset from './reset'

let { html, body, main, script, head, link } = React.DOM
let { NODE_ENV } = process.env
let r = NODE_ENV == 'production' ? require : rewire

class Layout extends React.Component {
  render () {
    let fname = path.resolve(__dirname, '..', this.props.child)
    let comp = r(fname).default(this.props)
    return (
      html({},
        head({},
          link({ src: reset })),
        body({},
          main({ id: 'main' }, comp),
          script({ src: 'index.js' }))))
  }
}

export default (props) => React.createElement(Layout, props)
