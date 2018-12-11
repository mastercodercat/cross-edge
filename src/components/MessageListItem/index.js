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

const MessageListItem = ({ message: { type, title, date, description }, selected }) => (
  <StyleWrapper className={cx(`type-${type}`, { selected })}>
    <div className="icon">
      <i className={`fal fa-${ICONS[type]}`} />
    </div>
    <div className="content">
    <div className="date">{moment(date).format('MMM D')}</div>
      <div className="title">
        <strong>{title}</strong>
      </div>
      <div className="description">{description}</div>
    </div>
  </StyleWrapper>
)

export default MessageListItem
