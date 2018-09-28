import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { createStructuredSelector } from 'reselect'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Icon, Modal } from 'antd'

import ChannelList from 'components/ChannelList'
import ChannelEntryList from 'components/ChannelEntryList'
import { REQUEST_INITIAL } from 'constants.js'
import {
  selectChannels,
  selectCurrentChannelEntries,
  selectCurrentChannelEntriesChannel,
  loadChannels,
  loadChannelEntries,
  setChannelEntriesChannel,
  setChannelEntriesPage,
  setChannelEntriesPageSize,
} from 'store/modules/channels'
import { isLoading, needsLoading } from 'utils/state-helpers'
import StyleWrapper from './style'


export class Channels extends Component {

  static propTypes = {
    channels: ImmutablePropTypes.record.isRequired,
    currentChannelEntries: ImmutablePropTypes.record.isRequired,
    currentChannelEntriesChannel: ImmutablePropTypes.record,
    loadChannels: PropTypes.func.isRequired,
    loadChannelEntries: PropTypes.func.isRequired,
    setChannelEntriesChannel: PropTypes.func.isRequired,
    setChannelEntriesPage: PropTypes.func.isRequired,
    setChannelEntriesPageSize: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  }

  handleClickColumn = (record, ev) => {
    ev.preventDefault()
    const { history } = this.props
    history.push(`/channels/${record.id}`)
  }

  handleClickEntries = (channel, ev) => {
    ev.preventDefault()

    this.props.setChannelEntriesChannel(channel)
    this.props.loadChannelEntries()
  }

  rowClassName = (record) => {
    const { currentChannelEntriesChannel } = this.props
    return currentChannelEntriesChannel && currentChannelEntriesChannel.id === record.id ?
      'table-row-active' : 'table-row-inactive'
  }

  handleChangeChannelEntriesPage = (page, pageSize) => {
    this.props.setChannelEntriesPage(page)
    this.props.setChannelEntriesPageSize(pageSize)
    this.props.loadChannelEntries()
  }

  handleCloseModal = () => {
    const { history } = this.props
    history.push('/channels')
  }

  componentDidMount() {
    const { channels, loadChannels } = this.props
    if (needsLoading(channels.state)) {
      loadChannels()
    }
  }

  render() {
    const {
      channels,
      currentChannelEntries,
      currentChannelEntriesChannel,
      children,
      location,
    } = this.props

    return (
      <StyleWrapper>
        <h1>
          <Icon type="cluster" /> Channel Manager
        </h1>

        <ChannelList
          loading={isLoading(channels.state)}
          channels={channels.data.toArray()}
          rowClassName={this.rowClassName}
          onClickColumn={this.handleClickColumn}
          onClickEntries={this.handleClickEntries}
        />

        {
          currentChannelEntries.state !== REQUEST_INITIAL &&
          <div>
            <h2 className="mt">{currentChannelEntriesChannel.name} Entries</h2>

            <ChannelEntryList
              loading={isLoading(currentChannelEntries.state)}
              channelEntries={currentChannelEntries.data.toArray()}
              actions={[
                { text: 'Details', handler: (record, e) => e.preventDefault() },
              ]}
              pagination={{
                total: currentChannelEntries.count,
                current: currentChannelEntries.page,
                pageSize: currentChannelEntries.pageSize,
                onChange: this.handleChangeChannelEntriesPage,
              }}
            />
          </div>
        }

        <Modal
          title={null}
          footer={null}
          visible={location.pathname !== '/channels'}
          onCancel={this.handleCloseModal}
        >
          {children}
        </Modal>
      </StyleWrapper>
    )
  }
}

const selector = createStructuredSelector({
  channels: selectChannels,
  currentChannelEntries: selectCurrentChannelEntries,
  currentChannelEntriesChannel: selectCurrentChannelEntriesChannel,
})

const actions = {
  loadChannels,
  loadChannelEntries,
  setChannelEntriesChannel,
  setChannelEntriesPage,
  setChannelEntriesPageSize,
}

export default compose(
  withRouter,
  connect(selector, actions)
)(Channels)
