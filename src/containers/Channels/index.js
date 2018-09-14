import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createStructuredSelector } from 'reselect'
import ImmutablePropTypes from 'react-immutable-proptypes'

import {
  loadChannels,
  selectChannelList,
  selectChannelListStateLoaded,
} from 'store/modules/channels'
import { isLoading } from 'utils/state-helpers'


class Channels extends Component {

  static propTypes = {
    channels: ImmutablePropTypes.list.isRequired,
    channelsState: PropTypes.string.isRequired,
    loadChannels: PropTypes.func.isRequired,
  }

  componentDidMount() {
    console.log('did mount')
    this.props.loadChannels()
  }

  render() {
    const { channels, channelsState } = this.props

    return (
      <div>
        {isLoading(channelsState) && <div>Loading...</div>}

        {channels.map(channel => (
          <div key={channel.id}>{channel.id} {channel.name}</div>
        ))}
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
