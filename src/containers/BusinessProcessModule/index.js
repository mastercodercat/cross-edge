import React, { Component } from 'react'
import { Row, Col, Icon, Spin } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

import SpinnerDummyContent from 'components/SpinnerDummyContent'
import SiteCard from 'components/SiteCard'
import PartnerCard from 'components/PartnerCard'
import {
  selectSites,
} from 'store/modules/sites'
import {
  loadPartners,
  selectPartners,
} from 'store/modules/partners'
import { isLoading } from 'utils/state-helpers'


export class BusinessProcessModule extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    sites: ImmutablePropTypes.record.isRequired,
    partners: ImmutablePropTypes.record.isRequired,
    loadPartners: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { loadPartners } = this.props
    loadPartners({
      loadSitesIfResponseEmpty: true,
    })
  }

  render() {
    const { sites, partners, history } = this.props
    const loading = isLoading(partners.state) || isLoading(sites.state, true)
    const showPartners = !isLoading(partners.state) && partners.data.size > 0

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
                  showPartners ?
                  partners.data.map(partner => (
                    <Col key={partner.id} sm={24} md={12} lg={8}>
                      <PartnerCard
                        partner={partner}
                        onClickSites={() => history.push(`/partners/${partner.id}/sites`)}
                        onClickBusinessProcesses={() => history.push(`/partners/${partner.id}/business-processes`)}
                      />
                    </Col>
                  ))
                  :
                  sites.data.map(site => (
                    <Col key={site.id} sm={24} md={12} lg={8}>
                      <SiteCard
                        site={site}
                        onClickSubsites={() => history.push(`/sites/${site.id}/sublocations`)}
                        onClickBusinessProcesses={() => history.push(`/sites/${site.id}/business-processes`)}
                      />
                    </Col>
                  ))
                }
                {
                  (!loading && !partners.data.size && !sites.data.size) &&
                  <div>No sites found</div>
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
  sites: selectSites,
  partners: selectPartners,
})

const actions = {
  loadPartners,
}

export default compose(
  withRouter,
  connect(selector, actions),
)(BusinessProcessModule)
