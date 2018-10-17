import React, { Component } from 'react'
import { Row, Col, Icon, Spin, Pagination } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

import SpinnerDummyContent from 'components/SpinnerDummyContent'
import SiteCard from 'components/SiteCard'
import {
  loadSites,
  setSitesPage,
  setSitesPageSize,
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
    loadSites: PropTypes.func.isRequired,
    setSitesPage: PropTypes.func.isRequired,
    setSitesPageSize: PropTypes.func.isRequired,
    loadPartners: PropTypes.func.isRequired,
  }

  handleChangeSitesPage = (page, pageSize) => {
    const { loadSites, setSitesPage, setSitesPageSize } = this.props
    setSitesPage(page)
    setSitesPageSize(pageSize)
    loadSites()
  }

  componentDidMount() {
    const { loadSites, loadPartners } = this.props
    loadSites()
    loadPartners()
  }

  render() {
    const { sites, partners, history } = this.props
    const loading = isLoading(sites.state) || isLoading(partners.state)

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
            (
              sites.data ?
              <React.Fragment>
                <Row gutter={15}>
                  {sites.data.map(site => (
                    <Col key={site.id} sm={24} md={12} lg={8}>
                      <SiteCard
                        site={site}
                        onClickSubsites={() => history.push(`/sites/${site.id}/sublocations`)}
                        onClickBusinessProcesses={() => history.push(`/sites/${site.id}/business-processes`)}
                      />
                    </Col>
                  ))}
                  {partners.data.map(partner => (
                    <Col key={partner.id} sm={24} md={12} lg={8}>
                      <SiteCard
                        site={partner}
                        onClickSubsites={() => history.push(`/partners/${partner.id}/sublocations`)}
                        onClickBusinessProcesses={e => e}
                      />
                    </Col>
                  ))}
                </Row>
                <div className="text-right">
                  <Pagination
                    total={sites.count}
                    current={sites.page}
                    pageSize={sites.pageSize}
                    onChange={this.handleChangeSitesPage}
                  />
                </div>
              </React.Fragment>
              :
              <div>No sites found</div>
            )
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
  loadSites,
  setSitesPage,
  setSitesPageSize,
  loadPartners,
}

export default compose(
  withRouter,
  connect(selector, actions),
)(BusinessProcessModule)
