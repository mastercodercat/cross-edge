import React from 'react'
import moment from 'moment'

import { NOTIFICATION_ICONS } from 'config/base'
import StyleWrapper from './style'


const NotificationMenuItem = ({ notification }) => {
  const { level, message, created } = notification

  return <StyleWrapper className={`type-${level.toLowerCase()}`}>
    <div className="icon">
      <i className={`fal fa-${NOTIFICATION_ICONS[level.toLowerCase()]}`} />
    </div>
    <div className="content">
      <div className="message">
        {message}
      </div>
      <div className="date">
        <strong>{moment(created).format('MMM D')}</strong>
      </div>
    </div>
  </StyleWrapper>
}

export default NotificationMenuItem
