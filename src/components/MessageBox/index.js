import React, { Component } from 'react'
import cx from 'classnames'

import MessageListItem from 'components/MessageListItem'
import StyleWrapper from './style'


class MessageBox extends Component {

  state = {
    height: 0,
  }

  constructor(props) {
    super(props);
    this.refBox = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => this.setState({
      height: window.innerHeight - this.refBox.current.offsetTop - 50
    }), 100)
  }

  render() {
    const messages = [
      { type: 'success', title: 'Lorem', date: new Date(), description: 'Lorem ipsum dolor res' },
      { type: 'warning', title: 'Ipsum', date: new Date(), description: 'Lorem ipsum dolor res' },
      { type: 'error', title: 'Dolor', date: new Date(), description: 'Lorem ipsum dolor res' },
      { type: 'info', title: 'Res', date: new Date(), description: 'Lorem ipsum dolor res' },
    ]
    const { height } = this.state

    return <StyleWrapper
      className={cx({ visible: height > 0 })}
      style={{ height }}
      innerRef={this.refBox}>
      <div className="side">
        {
          messages.map(message => <MessageListItem
            key={message.title}
            message={message}
          />)
        }
      </div>

      <div className="content">
      </div>
    </StyleWrapper>
  }
}

export default MessageBox
