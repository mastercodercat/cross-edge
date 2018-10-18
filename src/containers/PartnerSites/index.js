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
} from 'store/modules/partners'
import {
  selectSites,
  loadPartnerSites,
} from 'store/modules/sites'
import { isLoading } from 'utils/state-helpers'


export class PartnerSites extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    partner: ImmutablePropTypes.record.isRequired,
    sites: ImmutablePropTypes.record.isRequired,
    loadPartnerSites: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { match, loadPartnerSites } = this.props

    loadPartnerSites({
      id: match.params.partnerId,
    })
  }

  render() {
    const { history, partner, sites } = this.props
    const loading = isLoading(sites.state)

    return (
      <div>
        <h1>
          <Icon type="profile" /> Sites for {partner.data.name}
        </h1>

        <Spin spinning={loading}>
          {
            loading ?
            <SpinnerDummyContent /> :
            <React.Fragment>
              {
                sites.data.size > 0 ?
                <Row gutter={15}>
                  {
                    sites.data.map(site => (
                      <Col key={site.id} sm={24} md={12} lg={8}>
                        <SiteCard
                          isSite
                          site={site}
                          onClickSubsites={() => history.push(`/sites/${site.id}/sublocations`)}
                          onClickBusinessProcesses={() => history.push(`/sites/${site.id}/business-processes`)}
                        />
                      </Col>
                    ))
                  }
                </Row>
                :
                <div>No sites found.</div>
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
  sites: selectSites,
})

const actions = {
  loadPartnerSites,
}

export default compose(
  withRouter,
  connect(selector, actions),
)(PartnerSites)
