import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Select, Input } from 'antd'
import { PageTitle } from 'components/common'
import MessageBox from 'components/MessageBox'
import { needsLoading } from 'utils/state-helpers'
import {
  loadNotifications,
  selectNotifications,
  selectNotificationsChanged
} from 'store/modules/notifications'
import StyleWrapper from './style'


const { Option } = Select
const { Search } = Input

export class Messages extends Component {

  static propTypes = {
    loadNotifications: PropTypes.func.isRequired,
    notifications: ImmutablePropTypes.record.isRequired,
    notificationsChangedByLastLoad: PropTypes.bool,
  }

  componentDidMount() {
    this.props.loadNotifications()
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.notificationsChangedByLastLoad
  }

  render() {
    const { notifications } = this.props

    const header = <div className="filterBar">
      <div className="filter">
        <label><strong>Filter</strong></label>
        <Select className="bpFilterSelect">
          <Option key="*">All</Option>
          <Option key="2">BP 2</Option>
        </Select>
      </div>
      <div className="search">
        <Search className="searchInput" placeholder="Search Messages..." />
      </div>
    </div>

    return <StyleWrapper>
      <PageTitle>
        <i className="fal fa-envelope" /> Messages
      </PageTitle>

      <MessageBox
        messages={notifications.data}
        header={header}
        loading={needsLoading(notifications.state)}
      />
    </StyleWrapper>
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
