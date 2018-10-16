import React, { Component } from 'react'
import { Spin } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withRouter } from 'react-router'

import SpinnerDummyContent from 'components/SpinnerDummyContent'
import {
  loadSiteOrGetFromCache,
  selectCurrentSite,
} from 'store/modules/sites'
import { isLoading, hasFailed } from 'utils/state-helpers'

export class Site extends Component {

  static propTypes = {
    site: ImmutablePropTypes.record.isRequired,
    loadSiteOrGetFromCache: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { match, loadSiteOrGetFromCache } = this.props
    loadSiteOrGetFromCache({ id: match.params.id })
  }

  render() {
    const { site, children } = this.props
    const loading = isLoading(site.state)

    if (hasFailed(site.state)) {
      return <div>Failed to load site information.</div>
    }

    return (
      <Spin spinning={loading}>
        {
          loading ?
          <SpinnerDummyContent /> :
          children
        }
      </Spin>
    )
  }
}

const selector = createStructuredSelector({
  site: selectCurrentSite,
})

const actions = {
  loadSiteOrGetFromCache,
}

export default compose(
  withRouter,
  connect(selector, actions),
)(Site)
