import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

import { PageTitle } from 'components/common'
import MessageBox from 'components/MessageBox'
import { needsLoading } from 'utils/state-helpers'
import {
  loadNotifications,
  selectNotifications,
  selectNotificationsChanged
} from 'store/modules/notifications'


export class Messages extends Component {

  static propTypes = {
    loadNotifications: PropTypes.func.isRequired,
    notifications: ImmutablePropTypes.record.isRequired,
    notificationsChangedByLastLoad: PropTypes.bool,
  }

  componentDidCatch() {
    this.props.loadNotifications()
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.notificationsChangedByLastLoad
  }

  render() {
    const { notifications } = this.props

    return <div>
      <PageTitle>
        <i className="fal fa-envelope" /> Messages
      </PageTitle>

      <MessageBox
        messages={notifications.data}
        loading={needsLoading(notifications.state)}
      />
    </div>
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
)(Messages)
