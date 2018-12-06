import React, { Component } from 'react'
import { Spin, Alert } from 'antd'
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
import StyleWrapper from './style'


export class BusinessProcess extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    businessProcess: ImmutablePropTypes.record.isRequired,
    submitDataState: PropTypes.string.isRequired,
    loadBusinessProcess: PropTypes.func.isRequired,
    submitData: PropTypes.func.isRequired,
  }

  state = {
    error: false,
    showForm: true,
  }

  handleSubmit = (data) => {
    const { submitData, businessProcess, history } = this.props
    const { go_back_after_submit, ...dataToSubmit } = data

    this.setState({
      error: false
    })

    submitData({
      process_name: businessProcess.data.process_name,
      ...dataToSubmit,
    }, {
      onSuccess: () => {
        if (go_back_after_submit) {
          history.goBack();
        } else {
          // Reset form
          this.setState({
            showForm: false
          }, () => this.setState({
            showForm: true
          }))
        }
      },
      onFail: () => this.setState({
        error: true
      })
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
    const { error, showForm } = this.state
    const loading = isLoading(businessProcess.state)

    if (hasFailed(businessProcess.state)) {
      return <div>Failed to load business process.</div>
    }

    return (
      <Spin spinning={loading}>
        <StyleWrapper>
          {
            loading ?
            <SpinnerDummyContent />
            :
            <React.Fragment>
              <PageTitle>
                <i className="fal fa-barcode" /> {businessProcess.data.name}
              </PageTitle>

              <div className="wizardWrapper">
                {
                  error &&
                  <div className="alertWrapper">
                    <Alert message="Failed to submit data. Please try again later." type="error" />
                  </div>
                }

                {
                  showForm &&
                  <BusinessProcessWizard
                    businessProcess={businessProcess.data}
                    afterActionField="go_back_after_submit"
                    afterActionLabel="Go back to previous page after data submitted"
                    onSubmit={this.handleSubmit}
                    submitting={isPending(submitDataState)}
                  />
                }
              </div>
            </React.Fragment>
          }
        </StyleWrapper>
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
