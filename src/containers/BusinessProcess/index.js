import React, { Component } from 'react'
import { Icon, Spin } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

import SpinnerDummyContent from 'components/SpinnerDummyContent'
import Wizard from 'components/Wizard'
import ScanOrEnterIDs from 'components/BusinessProcessSteps/ScanOrEnterIDs'
import CheckDataAndSubmit from 'components/BusinessProcessSteps/CheckDataAndSubmit'
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
      process_name: businessProcess.data.name,
      data,
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
            <h1>
              <Icon type="profile" /> {businessProcess.data.name}
            </h1>
            
            <Wizard onSubmit={this.handleSubmit} submitting={isPending(submitDataState)}>
              <Wizard.Page validate={ScanOrEnterIDs.validate}>
                <ScanOrEnterIDs />
              </Wizard.Page>
              <Wizard.Page>
                <CheckDataAndSubmit />
              </Wizard.Page>
            </Wizard>
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
