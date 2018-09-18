import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { createStructuredSelector } from 'reselect'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Table, Spin } from 'antd'

import ChannelEntryList from 'components/ChannelEntryList'
import { REQUEST_INITIAL } from 'constants.js'
import {
  selectChannelList,
  selectChannelListState,
  selectCurrentChannelEntries,
  selectCurrentChannelEntriesState,
  loadChannels,
  loadChannelEntries,
} from 'store/modules/channels'
import { isLoading } from 'utils/state-helpers'


const { Column } = Table

class Channels extends Component {

  static propTypes = {
    channels: ImmutablePropTypes.list.isRequired,
    channelsState: PropTypes.string.isRequired,
    currentChannelEntries: ImmutablePropTypes.list.isRequired,
    currentChannelEntriesState: PropTypes.string.isRequired,
    loadChannels: PropTypes.func.isRequired,
    loadChannelEntries: PropTypes.func.isRequired,
    history: PropTypes.object,
  }

  state = {
    currentChannelForEntries: {}
  }

  handleClickColumn = (record, ev) => {
    ev.preventDefault()
    const { history } = this.props
    history.push(`/channels/${record.id}`)
  }

  handleClickEntries = (channel, ev) => {
    ev.preventDefault()
    this.setState({
      currentChannelForEntries: channel,
    })
    this.props.loadChannelEntries({ id: channel.id })
  }

  rowClassName = (record) => {
    const { currentChannelForEntries } = this.state
    return currentChannelForEntries.id === record.id ?
      'table-row-active' : 'table-row-inactive'
  }

  componentDidMount() {
    this.props.loadChannels()
  }

  render() {
    const {
      channels,
      channelsState,
      currentChannelEntries,
      currentChannelEntriesState,
    } = this.props
    const { currentChannelForEntries } = this.state

    return (
      <div>
        <h1>Channels</h1>

        <Spin spinning={isLoading(channelsState)}>
          <Table
            dataSource={channels.toArray()}
            pagination={false}
            rowClassName={this.rowClassName}
            rowKey="id"
          >
            <Column
              title="Id"
              dataIndex="id"
              key="id"
            />
            <Column
              title="Name"
              dataIndex="name"
              key="name"
            />
            <Column
              title="GLN"
              dataIndex="gln"
              key="gln"
            />
            <Column
              title="Country"
              dataIndex="country"
              key="country"
            />
            <Column
              title="Action"
              key="action"
              render={(text, record) => (
                <span>
                  <a href={`/channels/${record.id}`} onClick={this.handleClickColumn.bind(this, record)}>Details</a>
                  {'  '}
                  <a href="/channels" onClick={this.handleClickEntries.bind(this, record)}>Entries</a>
                </span>
              )}
            />
          </Table>
        </Spin>

        {
          currentChannelEntriesState !== REQUEST_INITIAL &&
          <div>
            <h2 className="mt">Channel entries of {currentChannelForEntries.name}</h2>

            <ChannelEntryList
              loading={isLoading(currentChannelEntriesState)}
              channelEntries={currentChannelEntries.toArray()}
              action={[
                { text: 'Details', handler: e => e },
              ]}
            />
          </div>
        }
      </div>
    )
  }
}

const selector = createStructuredSelector({
  channels: selectChannelList,
  channelsState: selectChannelListState,
  currentChannelEntries: selectCurrentChannelEntries,
  currentChannelEntriesState: selectCurrentChannelEntriesState,
})

const actions = {
  loadChannels,
  loadChannelEntries,
}

export default compose(
  withRouter,
  connect(selector, actions)
)(Channels)
