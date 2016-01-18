import React from 'react'
import rewire from 'rewire'
import path from 'path'
import reset from './reset'
import sharify from 'sharify'

let { html, body, main, script, head, link, div } = React.DOM

class Layout extends React.Component {
  render () {
    return (
      html({},
        head({},
          link({ src: reset })),
        body({},
          main({ id: 'main' }, this.props.child(this.props)),
          div({
            dangerouslySetInnerHTML: { __html: this.props.sharify.script() }
          }),
          script({ src: 'index.js' })))
    )
  }
}

export default (props) => React.createElement(Layout, props)
