import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Spin } from 'antd'

import NotificationMenuItem from 'components/NotificationMenuItem'
import { needsLoading, hasFailed } from 'utils/state-helpers'
import {
  loadNotifications,
  selectNotifications,
} from 'store/modules/notifications'
import StyleWrapper from './style'


export class NotificationMenu extends Component {

  static propTypes = {
    loadNotifications: PropTypes.func.isRequired,
    notifications: ImmutablePropTypes.record.isRequired,
  }

  componentDidMount() {
    const { notifications, loadNotifications } = this.props
    if (needsLoading(notifications)) {
      loadNotifications()
    }
  }

  render() {
    const { notifications } = this.props

    let notificationList = null;
    if (needsLoading(notifications.state, true)) {
      notificationList = <div className="spinner">
        <center><Spin /></center>
      </div>
    } else if (hasFailed(notifications.state)) {
      notificationList = <div className="error">
        <center>Failed to load notifications.</center>
      </div>
    } else {
      notificationList = notifications.data.map(notification => (
        <NotificationMenuItem key={notification.id} notification={notification} />
      ))
    }

    return <StyleWrapper>
      <div className="inner-wrapper">
        {notificationList}

        <Link className="messages-link" to="/notifications">
          View all notifications
        </Link>
      </div>
    </StyleWrapper>
  }
}

const selector = createStructuredSelector({
  notifications: selectNotifications,
})

const actions = {
  loadNotifications,
}

export default compose(
  connect(selector, actions),
)(NotificationMenu)
