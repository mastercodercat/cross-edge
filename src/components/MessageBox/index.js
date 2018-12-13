import React, { Component } from 'react'
import { Spin } from 'antd'
import Immutable from 'immutable'
import cx from 'classnames'
import ImmutablePropTypes from 'react-immutable-proptypes'
import moment from 'moment'

import MessageListItem from 'components/MessageListItem'
import StyleWrapper from './style'


class MessageBox extends Component {

  static propTypes = {
    messages: ImmutablePropTypes.list,
  }

  static defaultProps = {
    messages: Immutable.List(),
  }

  state = {
    height: 0,
    selectedId: 0,
  }

  constructor(props) {
    super(props);
    this.refBox = React.createRef();
  }

  handleClickListItem = (message) => {
    this.setState({
      selectedId: message.id,
    })
  }

  componentDidMount() {
    setTimeout(() => this.setState({
      height: window.innerHeight - this.refBox.current.offsetTop - 50
    }), 100)
  }

  render() {
    const { messages, loading } = this.props
    const { height, selectedId } = this.state

    const selectedMessage = messages.find(message => message.id === selectedId)
    const containerProps = {
      className: cx({ visible: height > 0 }),
      style: { height },
      innerRef: this.refBox,
    }

    if (loading) {
      return <StyleWrapper {...containerProps}>
        <div className="spinner">
          <Spin />
        </div>
      </StyleWrapper>
    }

    return <StyleWrapper {...containerProps}>
      <div className="side">
        {
          messages.map(message => <MessageListItem
            key={message.id}
            message={message}
            selected={message.id === selectedId}
            onClick={this.handleClickListItem}
          />)
        }
      </div>

      <div className="content">
        {
          selectedMessage ?
          <div className="contentInner">
            <p><strong>
              {moment(selectedMessage.created).format('MMM D')}
            </strong></p>
            <div>{selectedMessage.message}</div>
          </div> :
          <div className="unselectedNotice">Select a message</div>
        }
      </div>
    </StyleWrapper>
  }
}

export default MessageBox
