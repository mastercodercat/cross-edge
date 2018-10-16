import React, { Component } from 'react'
import { Icon, Spin } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

import SpinnerDummyContent from 'components/SpinnerDummyContent'
import {
  loadBusinessProcess,
  selectCurrentBusinessProcess,
} from 'store/modules/businessProcesses'
import { isLoading, hasFailed } from 'utils/state-helpers'


export class BusinessProcess extends Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    businessProcess: ImmutablePropTypes.record.isRequired,
    loadBusinessProcess: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { loadBusinessProcess, match } = this.props
    loadBusinessProcess({
      name: match.params.name,
    })
  }

  render() {
    const { businessProcess } = this.props
    const loading = isLoading(businessProcess.state)

    if (hasFailed(businessProcess.state)) {
      return <div>Failed to load business process.</div>
    }

    return (
      <Spin spinning={loading}>
        {
          loading ?
          <SpinnerDummyContent />
          :
          <React.Fragment>
            <h1>
              <Icon type="profile" /> {businessProcess.data.name}
            </h1>
            <div>content</div>
          </React.Fragment>
        }
      </Spin>
    )
  }
}

const selector = createStructuredSelector({
  businessProcess: selectCurrentBusinessProcess,
})

const actions = {
  loadBusinessProcess,
}

export default compose(
  withRouter,
  connect(selector, actions),
)(BusinessProcess)
