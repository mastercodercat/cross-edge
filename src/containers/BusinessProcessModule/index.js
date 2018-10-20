import React, { Component } from 'react'
import { Row, Col, Icon, Spin } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

import SpinnerDummyContent from 'components/SpinnerDummyContent'
import PartnerCard from 'components/PartnerCard'
import {
  loadPartners,
  selectPartners,
} from 'store/modules/partners'
import { isLoading } from 'utils/state-helpers'


export class BusinessProcessModule extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    partners: ImmutablePropTypes.record.isRequired,
    loadPartners: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { loadPartners } = this.props
    loadPartners()
  }

  render() {
    const { partners, history } = this.props
    const loading = isLoading(partners.state)

    return (
      <div>
        <h1>
          <Icon type="profile" /> Business Process Module
        </h1>

        <Spin spinning={loading}>
          {
            loading ?
            <SpinnerDummyContent />
            :
            <React.Fragment>
              <Row gutter={15}>
                {
                  partners.data.map(partner => (
                    <Col key={partner.id} sm={24} md={12} lg={8}>
                      <PartnerCard
                        data={partner}
                        history={history}
                      />
                    </Col>
                  ))
                }
              </Row>
            </React.Fragment>
          }
        </Spin>
      </div>
    )
  }
}

const selector = createStructuredSelector({
  partners: selectPartners,
})

const actions = {
  loadPartners,
}

export default compose(
  withRouter,
  connect(selector, actions),
)(BusinessProcessModule)
