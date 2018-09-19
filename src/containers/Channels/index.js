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
  selectCurrentChannelEntriesPage,
  selectCurrentChannelEntriesPageSize,
  selectCurrentChannelEntriesCount,
  loadChannels,
  loadChannelEntries,
  setChannelEntriesChannelId,
  setChannelEntriesPage,
  setChannelEntriesPageSize,
} from 'store/modules/channels'
import { isLoading } from 'utils/state-helpers'
import StyleWrapper from './style'


const { Column } = Table

class Channels extends Component {

  static propTypes = {
    channels: ImmutablePropTypes.list.isRequired,
    channelsState: PropTypes.string.isRequired,
    currentChannelEntries: ImmutablePropTypes.list.isRequired,
    currentChannelEntriesState: PropTypes.string.isRequired,
    currentChannelEntriesPage: PropTypes.number.isRequired,
    currentChannelEntriesPageSize: PropTypes.number.isRequired,
    currentChannelEntriesCount: PropTypes.number.isRequired,
    loadChannels: PropTypes.func.isRequired,
    loadChannelEntries: PropTypes.func.isRequired,
    setChannelEntriesChannelId: PropTypes.func.isRequired,
    setChannelEntriesPage: PropTypes.func.isRequired,
    setChannelEntriesPageSize: PropTypes.func.isRequired,
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
    this.props.setChannelEntriesChannelId(channel.id)
    this.props.loadChannelEntries()
  }

  rowClassName = (record) => {
    const { currentChannelForEntries } = this.state
    return currentChannelForEntries.id === record.id ?
      'table-row-active' : 'table-row-inactive'
  }

  handleChangeChannelEntriesPage = (page, pageSize) => {
    this.props.setChannelEntriesPage(page)
    this.props.setChannelEntriesPageSize(pageSize)
    this.props.loadChannelEntries()
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
      currentChannelEntriesPage,
      currentChannelEntriesPageSize,
      currentChannelEntriesCount,
    } = this.props
    const { currentChannelForEntries } = this.state

    return (
      <StyleWrapper>
        <h1>Channels</h1>

        <Spin spinning={isLoading(channelsState)}>
          <Table
            dataSource={channels.toArray()}
            pagination={false}
            rowClassName={this.rowClassName}
            rowKey="id"
          >
            <Column
              title="ID"
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
                  <a className="mr" href={`/channels/${record.id}`} onClick={this.handleClickColumn.bind(this, record)}>Details</a>
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
              actions={[
                { text: 'Details', handler: (record, e) => e.preventDefault() },
              ]}
              pagination={{
                total: currentChannelEntriesCount,
                current: currentChannelEntriesPage,
                pageSize: currentChannelEntriesPageSize,
                onChange: this.handleChangeChannelEntriesPage,
              }}
            />
          </div>
        }
      </StyleWrapper>
    )
  }
}

const selector = createStructuredSelector({
  channels: selectChannelList,
  channelsState: selectChannelListState,
  currentChannelEntries: selectCurrentChannelEntries,
  currentChannelEntriesState: selectCurrentChannelEntriesState,
  currentChannelEntriesPage: selectCurrentChannelEntriesPage,
  currentChannelEntriesPageSize: selectCurrentChannelEntriesPageSize,
  currentChannelEntriesCount: selectCurrentChannelEntriesCount,
})

const actions = {
  loadChannels,
  loadChannelEntries,
  setChannelEntriesChannelId,
  setChannelEntriesPage,
  setChannelEntriesPageSize,
}

export default compose(
  withRouter,
  connect(selector, actions)
)(Channels)
