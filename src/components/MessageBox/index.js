import React, { Component } from 'react'
import { Spin } from 'antd'
import Immutable from 'immutable'
import cx from 'classnames'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import moment from 'moment'

import MessageListItem from 'components/MessageListItem'
import StyleWrapper from './style'


class MessageBox extends Component {

  static propTypes = {
    messages: ImmutablePropTypes.list,
    header: PropTypes.node,
    loading: PropTypes.bool,
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

  handleClickBack = (e) => {
    e.preventDefault()
    this.setState({
      selectedId: 0
    })
  }

  componentDidMount() {
    setTimeout(() => this.setState({
      height: window.innerHeight - this.refBox.current.offsetTop - 50
    }), 100)
  }

  render() {
    const { messages, header, loading } = this.props
    const { height, selectedId } = this.state

    const selectedMessage = messages.find(message => message.id === selectedId)
    const containerProps = {
      className: cx({ visible: height > 0, contentOpen: !!selectedMessage }),
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
      {
        header &&
        <div className="header">{header}</div>
      }

      <div className="contentBox">
        <div className="sideArea">
          {
            messages.map(message => <MessageListItem
              key={message.id}
              message={message}
              selected={message.id === selectedId}
              onClick={this.handleClickListItem}
            />)
          }
        </div>

        <div className="contentArea">
          {
            selectedMessage ?
            <div className="contentAreaInner">
              <a className="backLink" href="/" onClick={this.handleClickBack}>
                <i className="fa fa-chevron-left" /> Back
              </a>
              <p><strong>
                {moment(selectedMessage.created).format('MMM D')}
              </strong></p>
              <div>{selectedMessage.message}</div>
            </div> :
            <div className="unselectedNotice">Select a message</div>
          }
        </div>
      </div>
    </StyleWrapper>
  }
}

export default MessageBox
