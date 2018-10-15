import React, { Component } from 'react'
import { Row, Col, Spin, Icon, Pagination } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withRouter } from 'react-router'

import SpinnerDummyContent from 'components/SpinnerDummyContent'
import SiteCard from 'components/SiteCard'
import {
  selectCurrentSite,
  selectSiteSubsites,
  loadSiteSubsites,
  setSiteSubsitesPage,
  setSiteSubsitesPageSize,
} from 'store/modules/sites'
import { isLoading } from 'utils/state-helpers'


export class SiteSubsites extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    site: ImmutablePropTypes.record.isRequired,
    siteSubsites: ImmutablePropTypes.record.isRequired,
    loadSiteSubsites: PropTypes.func.isRequired,
    setSiteSubsitesPage: PropTypes.func.isRequired,
    setSiteSubsitesPageSize: PropTypes.func.isRequired,
  }

  handleChangeSiteSubsitesPage = (page, pageSize) => {
    const { loadSiteSubsites, setSiteSubsitesPage, setSiteSubsitesPageSize } = this.props
    setSiteSubsitesPage(page)
    setSiteSubsitesPageSize(pageSize)
    loadSiteSubsites()
  }

  componentDidMount() {
    const { site, loadSiteSubsites } = this.props
    loadSiteSubsites({
      id: site.id,
    })
  }

  render() {
    const { history, site, siteSubsites } = this.props
    const loading = isLoading(siteSubsites.state)

    return (
      <div>
        <h1>
          <Icon type="profile" /> {site.data.name} Sub Locations
        </h1>

        <Spin spinning={loading}>
          {
            loading ?
            <SpinnerDummyContent /> :
            <React.Fragment>
              <Row gutter={15}>
                {
                  siteSubsites.data.map(subsite => (
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
              <div className="text-right">
                <Pagination
                  total={siteSubsites.count}
                  current={siteSubsites.page}
                  pageSize={siteSubsites.pageSize}
                  onChange={this.handleChangeSiteSubsitesPage}
                />
              </div>
            </React.Fragment>
          }
        </Spin>
      </div>
    )
  }

}

const selector = createStructuredSelector({
  site: selectCurrentSite,
  siteSubsites: selectSiteSubsites,
})

const actions = {
  loadSiteSubsites,
  setSiteSubsitesPage,
  setSiteSubsitesPageSize,
}

export default compose(
  withRouter,
  connect(selector, actions),
)(SiteSubsites)
