import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { createStructuredSelector } from 'reselect'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Table, Spin } from 'antd'

import {
  loadChannels,
  selectChannelList,
  selectChannelListStateLoaded,
} from 'store/modules/channels'
import { isLoading } from 'utils/state-helpers'


const { Column } = Table;

class Channels extends Component {

  static propTypes = {
    channels: ImmutablePropTypes.list.isRequired,
    channelsState: PropTypes.string.isRequired,
    loadChannels: PropTypes.func.isRequired,
    history: PropTypes.object,
  }

  handleClickColumn = (record, ev) => {
    ev.preventDefault()

    const { history } = this.props
    history.push(`/channels/${record.id}`)
  }

  componentDidMount() {
    this.props.loadChannels()
  }

  render() {
    const { channels, channelsState } = this.props

    return (
      <div>
        <h1>Channels</h1>

        <Spin spinning={isLoading(channelsState)}>
          <Table
            dataSource={channels.toArray()}
            pagination={false}
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
                <a href=":;" onClick={this.handleClickColumn.bind(this, record)}>Details</a>
              )}
            />
          </Table>
        </Spin>
      </div>
    )
  }
}

const selector = createStructuredSelector({
  channels: selectChannelList,
  channelsState: selectChannelListStateLoaded,
})

const actions = {
  loadChannels,
}

export default compose(
  withRouter,
  connect(selector, actions)
)(Channels)
