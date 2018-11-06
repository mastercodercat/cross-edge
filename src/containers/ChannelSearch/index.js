import React, { Component } from 'react'
import { Icon } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createStructuredSelector } from 'reselect'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Spin } from 'antd'

import SpinnerDummyContent from 'components/SpinnerDummyContent'
import {
  selectsearchedChannels,
  searchChannels,
} from 'store/modules/channels'
import { isLoading } from 'utils/state-helpers'


export class ChannelSearch extends Component {

  static propTypes = {
    searchedChannels: ImmutablePropTypes.record.isRequired,
    searchChannels: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { match, searchChannels } = this.props
    searchChannels({
      serialNumber: match.params.serialNumber,
    })
  }

  render() {
    const { searchedChannels } = this.props
    const loading = isLoading(searchedChannels.state)

    return <div>
      <h1>
        <Icon type="search" /> Search
      </h1>

      <Spin spinning={loading}>
        {
          loading ?
          <SpinnerDummyContent />
          :
          (
            searchedChannels.data.size > 0 ?
            <div>
              {
                searchedChannels.data.map(channel => <span>{channel.name} </span>)
              }
            </div>
            :
            <div>
              No results were found.
            </div>
          )
        }
      </Spin>
    </div>
  }

}

const selector = createStructuredSelector({
  searchedChannels: selectsearchedChannels,
})

const actions = {
  searchChannels,
}

export default compose(
  connect(selector, actions)
)(ChannelSearch)
