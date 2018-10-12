import React, { Component } from 'react'
import { Spin, Icon } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withRouter } from 'react-router'

import SpinnerDummyContent from 'components/SpinnerDummyContent'
import {
  selectCurrentSite,
} from 'store/modules/sites'
import { isLoading } from 'utils/state-helpers'


export class SiteBusinessProcesses extends Component {

  static propTypes = {
    site: ImmutablePropTypes.record.isRequired,
  }

  render() {
    const { site } = this.props

    return (
      <div>
        <h1>
          <Icon type="profile" /> {site.data.name} Sub Locations
        </h1>
      </div>
    )
  }

}

const selector = createStructuredSelector({
  site: selectCurrentSite,
})

const actions = {
}

export default compose(
  withRouter,
  connect(selector, actions),
)(SiteBusinessProcesses)
