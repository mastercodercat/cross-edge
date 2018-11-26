import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { createStructuredSelector } from 'reselect'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Spin } from 'antd'

import { PageTitle } from 'components/common'
import ChannelEntryList from 'components/ChannelEntryList'
import SpinnerDummyContent from 'components/SpinnerDummyContent'
import {
  selectCurrentChannel,
  selectCurrentChannelEntries,
  loadChannel,
  loadChannelEntries,
  setChannelEntriesPage,
  setChannelEntriesPageSize,
} from 'store/modules/channels'
import { isLoading } from 'utils/state-helpers'


export class ChannelEntries extends Component {

  static propTypes = {
    currentChannel: ImmutablePropTypes.record.isRequired,
    currentChannelEntries: ImmutablePropTypes.record.isRequired,
    loadChannel: PropTypes.func.isRequired,
    loadChannelEntries: PropTypes.func.isRequired,
    setChannelEntriesPage: PropTypes.func.isRequired,
    setChannelEntriesPageSize: PropTypes.func.isRequired,
  }

  handleChangeChannelEntriesPage = (page, pageSize) => {
    const {
      match,
      setChannelEntriesPage,
      setChannelEntriesPageSize,
      loadChannelEntries,
    } = this.props

    setChannelEntriesPage(page)
    setChannelEntriesPageSize(pageSize)
    loadChannelEntries({
      channelId: match.params.id
    })
  }

  componentDidMount() {
    const { match, loadChannel, setChannelEntriesPage, loadChannelEntries } = this.props

    loadChannel({
      id: match.params.id
    })

    setChannelEntriesPage(1)
    loadChannelEntries({
      channelId: match.params.id
    })
  }

  render() {
    const { currentChannel, currentChannelEntries } = this.props

    if (isLoading(currentChannel.state)) {
      return (
        <Spin spinning>
          <SpinnerDummyContent />
        </Spin>
      )
    }

    return (
      <div>
        <PageTitle>
          <i className="fal fa-list-ul" /> {currentChannel.data.name} Entries
        </PageTitle>

        <ChannelEntryList
          loading={isLoading(currentChannelEntries.state)}
          channelEntries={currentChannelEntries.data.toArray()}
          pagination={{
            total: currentChannelEntries.count,
            current: currentChannelEntries.page,
            pageSize: currentChannelEntries.pageSize,
            onChange: this.handleChangeChannelEntriesPage,
          }}
        />
      </div>
    )
  }
}

const selector = createStructuredSelector({
  currentChannel: selectCurrentChannel,
  currentChannelEntries: selectCurrentChannelEntries,
})

const actions = {
  loadChannel,
  loadChannelEntries,
  setChannelEntriesPage,
  setChannelEntriesPageSize,
}

export default compose(
  withRouter,
  connect(selector, actions)
)(ChannelEntries)
