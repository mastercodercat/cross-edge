import React from 'react'
import moment from 'moment'
import cx from 'classnames'

import { NOTIFICATION_ICONS } from 'config/base'
import StyleWrapper from './style'


const MessageListItem = ({ message: messageObj, selected, onClick }) => {
  const { level, message, created } = messageObj
  const props = {
    className: cx(`type-${level.toLowerCase()}`, { selected })
  }
  if (onClick) {
    props.onClick = onClick.bind(this, messageObj)
  }

  return <StyleWrapper {...props}>
    <div className="icon">
      <i className={`fal fa-${NOTIFICATION_ICONS[level.toLowerCase()]}`} />
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
