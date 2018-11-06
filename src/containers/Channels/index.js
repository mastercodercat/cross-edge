import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { createStructuredSelector } from 'reselect'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Icon, Modal } from 'antd'

import ChannelList from 'components/ChannelList'
import {
  selectChannels,
  loadChannels,
  setChannelsPage,
  setChannelsPageSize,
} from 'store/modules/channels'
import { isLoading, needsLoading } from 'utils/state-helpers'
import StyleWrapper from './style'


export class Channels extends Component {

  static propTypes = {
    channels: ImmutablePropTypes.record.isRequired,
    loadChannels: PropTypes.func.isRequired,
    setChannelsPage: PropTypes.func.isRequired,
    setChannelsPageSize: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  }

  handleClickColumn = (record, ev) => {
    ev.preventDefault()
    const { history } = this.props
    history.push(`/channels/${record.id}`)
  }

  handleClickEntries = (record, ev) => {
    ev.preventDefault()
    const { history } = this.props
    history.push(`/channels/${record.id}/channel-entries`)
  }

  handleChangeChannelsPage = (page, pageSize) => {
    this.props.setChannelsPage(page)
    this.props.setChannelsPageSize(pageSize)
    this.props.loadChannels()
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
          pagination={{
            total: channels.count,
            current: channels.page,
            pageSize: channels.pageSize,
            onChange: this.handleChangeChannelsPage,
          }}
        />

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
})

const actions = {
  loadChannels,
  setChannelsPage,
  setChannelsPageSize,
}

export default compose(
  withRouter,
  connect(selector, actions)
)(Channels)
