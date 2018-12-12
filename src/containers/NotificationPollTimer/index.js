import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

import { NOTIFICATION_POLL_INTERVAL_LEVELS } from 'config/base'
import {
  loadNotifications,
  selectNotifications,
  selectNotificationsChanged,
} from 'store/modules/notifications'


export class NotificationPollTimer extends Component {

  static propTypes = {
    notifications: ImmutablePropTypes.record.isRequired,
    loadNotifications: PropTypes.func.isRequired,
    notificationsChangedByLastLoad: PropTypes.bool,
  }

  state = {
    loadedTimesWithoutChange: 0,
    intervalLevel: 0,
  }

  handleTimerEvent = () => {
    const {
      loadNotifications,
      notificationsChangedByLastLoad
    } = this.props

    loadNotifications()

    let {
      loadedTimesWithoutChange,
      intervalLevel,
    } = this.state
    if (notificationsChangedByLastLoad) {
      this.setState({
        loadedTimesWithoutChange: 0,
        intervalLevel: 0,
      }, this.setTimer)
    } else {
      if (loadedTimesWithoutChange >= 3) {
        loadedTimesWithoutChange = 0
        intervalLevel = Math.max(intervalLevel + 1, 2)
      } else {
        loadedTimesWithoutChange += 1
      }
      this.setState({
        loadedTimesWithoutChange,
        intervalLevel,
      }, this.setTimer)
    }
  }

  setTimer = () => {
    const { intervalLevel } = this.state
    this.timer = setTimeout(this.handleTimerEvent, NOTIFICATION_POLL_INTERVAL_LEVELS[intervalLevel])
  }

  componentDidMount() {
    this.setTimer()
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }

  render() {
    return <div />
  }

}

const selector = createStructuredSelector({
  notifications: selectNotifications,
  notificationsChangedByLastLoad: selectNotificationsChanged,
})

const actions = {
  loadNotifications,
}

export default compose(
  connect(selector, actions),
)(NotificationPollTimer)
