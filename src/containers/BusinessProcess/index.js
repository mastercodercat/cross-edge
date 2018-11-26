import React, { Component } from 'react'
import { Icon, Spin } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

import { PageTitle } from 'components/common'
import SpinnerDummyContent from 'components/SpinnerDummyContent'
import BusinessProcessWizard from 'components/BusinessProcessWizard'
import {
  loadBusinessProcess,
  submitData,
  selectCurrentBusinessProcess,
  selectSubmitDataState,
} from 'store/modules/businessProcesses'
import { isLoading, isPending, hasFailed } from 'utils/state-helpers'


export class BusinessProcess extends Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    businessProcess: ImmutablePropTypes.record.isRequired,
    submitDataState: PropTypes.string.isRequired,
    loadBusinessProcess: PropTypes.func.isRequired,
    submitData: PropTypes.func.isRequired,
  }

  handleSubmit = (data) => {
    const { submitData, businessProcess } = this.props

    submitData({
      process_name: businessProcess.data.process_name,
      ...data,
    })
  }

  componentDidMount() {
    const { loadBusinessProcess, match } = this.props
    loadBusinessProcess({
      name: match.params.name,
    })
  }

  render() {
    const { businessProcess, submitDataState } = this.props
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
            <PageTitle>
              <Icon type="profile" /> {businessProcess.data.name}
            </PageTitle>

            <BusinessProcessWizard
              businessProcess={businessProcess.data}
              onSubmit={this.handleSubmit}
              submitting={isPending(submitDataState)}
            />
          </React.Fragment>
        }
      </Spin>
    )
  }
}

const selector = createStructuredSelector({
  businessProcess: selectCurrentBusinessProcess,
  submitDataState: selectSubmitDataState,
})

const actions = {
  loadBusinessProcess,
  submitData,
}

export default compose(
  withRouter,
  connect(selector, actions),
)(BusinessProcess)
