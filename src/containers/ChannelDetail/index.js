import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { createStructuredSelector } from 'reselect'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Spin } from 'antd'

import ChannelEntryList from 'components/ChannelEntryList'
import SpinnerDummyContent from 'components/SpinnerDummyContent'
import {
  selectCurrentChannel,
  selectCurrentChannelState,
  selectCurrentChannelEntries,
  selectCurrentChannelEntriesState,
  loadChannel,
  loadChannelEntries,
} from 'store/modules/channels'
import { isLoading } from 'utils/state-helpers'


class ChannelDetail extends Component {

  static propTypes = {
    currentChannel: ImmutablePropTypes.record,
    currentChannelState: PropTypes.string.isRequired,
    loadChannel: PropTypes.func.isRequired,
    loadChannelEntries: PropTypes.func.isRequired,
    history: PropTypes.object,
  }

  componentDidMount() {
    const { match } = this.props
    this.props.loadChannel({ id: match.params.id })
    this.props.loadChannelEntries({ id: match.params.id })
  }

  render() {
    const {
      currentChannel,
      currentChannelState,
      currentChannelEntries,
      currentChannelEntriesState,
    } = this.props
    const loading = isLoading(currentChannelState)

    return (
      <div>
        <Spin spinning={loading}>
          {
            loading ?
            <SpinnerDummyContent />
            :
            <div>
              <h1>{currentChannel.name}</h1>

              <table className="info-table">
                <tbody>
                  <tr>
                    <td>ID</td><td>{currentChannel.id}</td>
                  </tr>
                  <tr>
                    <td>Name</td><td>{currentChannel.name}</td>
                  </tr>
                  <tr>
                    <td>Description</td><td>{currentChannel.description}</td>
                  </tr>
                  <tr>
                    <td>GLN</td><td>{currentChannel.gln}</td>
                  </tr>
                  <tr>
                    <td>URL</td><td>{currentChannel.url}</td>
                  </tr>
                  <tr>
                    <td>Address 1</td><td>{currentChannel.address_1}</td>
                  </tr>
                  <tr>
                    <td>Address 2</td><td>{currentChannel.address_2}</td>
                  </tr>
                  <tr>
                    <td>City</td><td>{currentChannel.city}</td>
                  </tr>
                  <tr>
                    <td>State</td><td>{currentChannel.state}</td>
                  </tr>
                  <tr>
                    <td>Country</td><td>{currentChannel.country}</td>
                  </tr>
                  <tr>
                    <td>Postal Code</td><td>{currentChannel.postal_code}</td>
                  </tr>
                  <tr>
                    <td>Time Zone Offset</td><td>{currentChannel.time_zone_offset}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          }
        </Spin>

        <h2>Channel entries</h2>

        <ChannelEntryList
          loading={isLoading(currentChannelEntriesState)}
          channelEntries={currentChannelEntries.toArray()}
          action={[
            { text: 'Details', handler: e => e },
          ]}
        />
      </div>
    )
  }
}

const selector = createStructuredSelector({
  currentChannel: selectCurrentChannel,
  currentChannelState: selectCurrentChannelState,
  currentChannelEntries: selectCurrentChannelEntries,
  currentChannelEntriesState: selectCurrentChannelEntriesState,
})

const actions = {
  loadChannel,
  loadChannelEntries,
}

export default compose(
  withRouter,
  connect(selector, actions)
)(ChannelDetail)
