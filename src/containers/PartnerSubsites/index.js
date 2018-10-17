import React, { Component } from 'react'
import { Row, Col, Spin, Icon } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withRouter } from 'react-router'

import SpinnerDummyContent from 'components/SpinnerDummyContent'
import SiteCard from 'components/SiteCard'
import {
  selectCurrentPartner,
  loadPartnerOrGetFromCache,
} from 'store/modules/partners'
import {
  selectSubsites,
  loadPartnerSubsites,
} from 'store/modules/sites'
import { isLoading } from 'utils/state-helpers'


export class PartnerSubsites extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    partner: ImmutablePropTypes.record.isRequired,
    subsites: ImmutablePropTypes.record.isRequired,
    loadPartnerSubsites: PropTypes.func.isRequired,
    loadPartnerOrGetFromCache: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { match, loadPartnerOrGetFromCache, loadPartnerSubsites } = this.props

    loadPartnerOrGetFromCache({
      id: match.params.partnerId,
    })

    loadPartnerSubsites({
      id: match.params.partnerId,
    })
  }

  render() {
    const { history, partner, subsites } = this.props
    const loading = isLoading(subsites.state)

    if (isLoading(partner.state)) {
      return <Spin spinning>
        <SpinnerDummyContent />
      </Spin>
    }

    return (
      <div>
        <h1>
          <Icon type="profile" /> {partner.data.name} Sub Locations
        </h1>

        <Spin spinning={loading}>
          {
            loading ?
            <SpinnerDummyContent /> :
            <React.Fragment>
              {
                subsites.data.size > 0 ?
                <Row gutter={15}>
                  {
                    subsites.data.map(subsite => (
                      <Col key={subsite.id} sm={24} md={12} lg={8}>
                        <SiteCard
                          isSubsite
                          site={subsite}
                          onClickBusinessProcesses={() => history.push(`/subsites/${subsite.id}/business-processes`)}
                        />
                      </Col>
                    ))
                  }
                </Row>
                :
                <div>No sub locations found.</div>
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
  subsites: selectSubsites,
})

const actions = {
  loadPartnerSubsites,
  loadPartnerOrGetFromCache,
}

export default compose(
  withRouter,
  connect(selector, actions),
)(PartnerSubsites)
