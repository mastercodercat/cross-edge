import React, { Component } from 'react'
import { Row, Col, Spin, Icon } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withRouter } from 'react-router'

import SpinnerDummyContent from 'components/SpinnerDummyContent'
import BusinessProcessCard from 'components/BusinessProcessCard'
import {
  selectCurrentPartner,
} from 'store/modules/partners'
import {
  selectBusinessProcesses,
  loadBusinessProcesses,
} from 'store/modules/businessProcesses'
import { isLoading } from 'utils/state-helpers'


export class PartnerBusinessProcesses extends Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    partner: ImmutablePropTypes.record.isRequired,
    businessProcesses: ImmutablePropTypes.record.isRequired,
    loadBusinessProcesses: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { match, loadBusinessProcesses } = this.props

    loadBusinessProcesses({
      partnerId: match.params.partnerId,
    })
  }

  render() {
    const { history, partner, businessProcesses } = this.props
    const loading = isLoading(businessProcesses.state)

    if (isLoading(partner.state)) {
      return <Spin spinning>
        <SpinnerDummyContent />
      </Spin>
    }

    return (
      <div>
        <h1>
          <Icon type="profile" /> Business Processes for {partner.data.name}
        </h1>

        <Spin spinning={loading}>
          {
            loading ?
            <SpinnerDummyContent /> :
            <React.Fragment>
              {
                businessProcesses.data.size > 0 ?
                <Row gutter={15}>
                  {
                    businessProcesses.data.map(businessProcess => (
                      <Col key={businessProcess.id} sm={24} md={12} lg={8}>
                        <BusinessProcessCard
                          businessProcess={businessProcess}
                          onClickGo={() => history.push(`/business-processes/${businessProcess.name}`)}
                        />
                      </Col>
                    ))
                  }
                </Row>
                :
                <div>No business processes found.</div>
              }
            </React.Fragment>
          }
        </Spin>
      </div>
    )
  }

}

const selector = createStructuredSelector({
  partner: selectCurrentPartner,
  businessProcesses: selectBusinessProcesses,
})

const actions = {
  loadBusinessProcesses,
}

export default compose(
  withRouter,
  connect(selector, actions),
)(PartnerBusinessProcesses)
