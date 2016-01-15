import React from 'react'
import Radium from 'Radium'
let { input, div } = React.DOM

class Chatbar extends React.Component {
  render () {
    return (
      div({ style: styles.divinput },
        input({ style: styles.divinput, placeholde: 'Type in a chat' })))
  }
}

let styles = {
  divinput: {
    width: '100%',
    position: 'absolute',
    height: '50px'
  }
}

export default (props) => React.createElement(Radium(Chatbar), props)