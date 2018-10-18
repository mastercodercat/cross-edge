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
  loadPartnerOrGetFromCache,
  selectCurrentPartner,
} from 'store/modules/partners'
import { isLoading, hasFailed } from 'utils/state-helpers'

export class Partner extends Component {

  static propTypes = {
    partner: ImmutablePropTypes.record.isRequired,
    loadPartnerOrGetFromCache: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { match, loadPartnerOrGetFromCache } = this.props
    loadPartnerOrGetFromCache({ id: match.params.id })
  }

  render() {
    const { partner, children } = this.props
    const loading = isLoading(partner.state)

    if (hasFailed(partner.state)) {
      return <div>Failed to load partner information.</div>
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
  partner: selectCurrentPartner,
})

const actions = {
  loadPartnerOrGetFromCache,
}

export default compose(
  withRouter,
  connect(selector, actions),
)(Partner)
