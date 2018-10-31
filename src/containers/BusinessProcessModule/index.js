import React, { Component } from 'react'
import { Row, Col, Icon, Spin } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

import SpinnerDummyContent from 'components/SpinnerDummyContent'
import SubscriberCard from 'components/SubscriberCard'
import PartnerCard from 'components/PartnerCard'
import SiteCard from 'components/SiteCard'
import BusinessProcessCard from 'components/BusinessProcessCard'
import {
  loadHome,
  selectHomeContent,
} from 'store/modules/bpm'
import { isLoading, hasFailed } from 'utils/state-helpers'


export class BusinessProcessModule extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    homeContent: ImmutablePropTypes.record.isRequired,
    loadHome: PropTypes.func.isRequired,
  }

  static cardComponents = {
    subscriber: SubscriberCard,
    partner: PartnerCard,
    businessProcess: BusinessProcessCard,
    site: SiteCard,
    subsite: SiteCard,
  }

  componentDidMount() {
    const { loadHome } = this.props
    loadHome()
  }

  render() {
    const { homeContent, history } = this.props
    const loading = isLoading(homeContent.state)

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
              {
                hasFailed(homeContent.state) &&
                'Failed to load data from server.'
              }

              <Row gutter={15}>
                {
                  homeContent.data.map(object => {
                    const Card = BusinessProcessModule.cardComponents[object.mdm_type]
                    return <Col key={object.id} sm={24} md={12} lg={8}>
                      <Card
                        data={object}
                        history={history}
                      />
                    </Col>
                  })
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
  homeContent: selectHomeContent,
})

const actions = {
  loadHome,
}

export default compose(
  withRouter,
  connect(selector, actions),
)(BusinessProcessModule)
