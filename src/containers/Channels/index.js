import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createStructuredSelector } from 'reselect'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Table } from 'antd'

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
  }

  state = {
    selectedRowKeys: [],
  };

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  componentDidMount() {
    this.props.loadChannels()
  }

  render() {
    const { channels, channelsState } = this.props
    const { selectedRowKeys } = this.state

    return (
      <div>
        <h1>Channels</h1>

        {isLoading(channelsState) && <div>Loading...</div>}

        <Table rowSelection={{ selectedRowKeys, onChange: this.onSelectChange }} dataSource={channels.toArray()}>
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
        </Table>
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
  connect(selector, actions)
)(Channels)
