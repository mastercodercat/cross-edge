import React from 'react'
import moment from 'moment'
import cx from 'classnames'

import StyleWrapper from './style'


const ICONS = {
  success: 'check-circle',
  warning: 'exclamation-circle',
  error: 'times-circle',
  info: 'info-circle'
}

const MessageListItem = ({ message: messageObj, selected, onClick }) => {
  const { level, message, created } = messageObj

  return <StyleWrapper className={cx(`type-${level.toLowerCase()}`, { selected })} onClick={onClick.bind(this, messageObj)}>
    <div className="icon">
      <i className={`fal fa-${ICONS[level.toLowerCase()]}`} />
    </div>
    <div className="content">
      <div className="date">
        <strong>{moment(created).format('MMM D')}</strong>
      </div>
      <div className="message">
        {message}
      </div>
    </div>
  </StyleWrapper>
}

export default MessageListItem
