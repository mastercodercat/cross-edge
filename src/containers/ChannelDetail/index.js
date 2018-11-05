import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { createStructuredSelector } from 'reselect'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Spin } from 'antd'

import SpinnerDummyContent from 'components/SpinnerDummyContent'
import {
  selectCurrentChannel,
  loadChannel,
} from 'store/modules/channels'
import { isLoading, hasFailed } from 'utils/state-helpers'


export class ChannelDetail extends Component {

  static propTypes = {
    currentChannel: ImmutablePropTypes.record,
    loadChannel: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { match } = this.props
    this.props.loadChannel({ id: match.params.id })
  }

  render() {
    const { currentChannel } = this.props
    const loading = isLoading(currentChannel.state)

    if (hasFailed(currentChannel.state)) {
      return <div>Failed to load channel information.</div>
    }

    return (
      <div>
        <Spin spinning={loading}>
          {
            loading ?
            <SpinnerDummyContent />
            :
            <div>
              <h1>{currentChannel.data.name}</h1>

              <table className="info-table">
                <tbody>
                  <tr>
                    <td>Name</td><td>{currentChannel.data.name}</td>
                  </tr>
                  <tr>
                    <td>Description</td><td>{currentChannel.data.description}</td>
                  </tr>
                  <tr>
                    <td>GLN</td><td>{currentChannel.data.gln}</td>
                  </tr>
                  <tr>
                    <td>URL</td><td>{currentChannel.data.url}</td>
                  </tr>
                  <tr>
                    <td>Address 1</td><td>{currentChannel.data.address_1}</td>
                  </tr>
                  <tr>
                    <td>Address 2</td><td>{currentChannel.data.address_2}</td>
                  </tr>
                  <tr>
                    <td>City</td><td>{currentChannel.data.city}</td>
                  </tr>
                  <tr>
                    <td>State</td><td>{currentChannel.data.state}</td>
                  </tr>
                  <tr>
                    <td>Country</td><td>{currentChannel.data.country}</td>
                  </tr>
                  <tr>
                    <td>Postal Code</td><td>{currentChannel.data.postal_code}</td>
                  </tr>
                  <tr>
                    <td>Time Zone Offset</td><td>{currentChannel.data.time_zone_offset}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          }
        </Spin>
      </div>
    )
  }
}

const selector = createStructuredSelector({
  currentChannel: selectCurrentChannel,
})

const actions = {
  loadChannel,
}

export default compose(
  withRouter,
  connect(selector, actions)
)(ChannelDetail)
