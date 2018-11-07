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
  selectSearchedChannelEntries,
  searchChannelEntries,
} from 'store/modules/channels'
import { isLoading } from 'utils/state-helpers'


export class ChannelSearch extends Component {

  static propTypes = {
    searchedChannelEntries: ImmutablePropTypes.record.isRequired,
    searchChannelEntries: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { match, searchChannelEntries } = this.props
    searchChannelEntries({
      serialNumber: match.params.serialNumber,
    })
  }

  render() {
    const { searchedChannelEntries } = this.props
    const loading = isLoading(searchedChannelEntries.state)

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
            searchedChannelEntries.data.size > 0 ?
            <div>
              {
                searchedChannelEntries.data.map(channel => <span>{channel.name} </span>)
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
  searchedChannelEntries: selectSearchedChannelEntries,
})

const actions = {
  searchChannelEntries,
}

export default compose(
  connect(selector, actions)
)(ChannelSearch)
