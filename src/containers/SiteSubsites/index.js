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
  selectCurrentSite,
  selectSubsites,
  loadSiteSubsites,
  setSiteSubsitesPage,
  setSiteSubsitesPageSize,
} from 'store/modules/sites'
import { isLoading } from 'utils/state-helpers'


export class SiteSubsites extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    site: ImmutablePropTypes.record.isRequired,
    subsites: ImmutablePropTypes.record.isRequired,
    loadSiteSubsites: PropTypes.func.isRequired,
    setSiteSubsitesPage: PropTypes.func.isRequired,
    setSiteSubsitesPageSize: PropTypes.func.isRequired,
  }

  handleChangeSiteSubsitesPage = (page, pageSize) => {
    const { site, loadSiteSubsites, setSiteSubsitesPage, setSiteSubsitesPageSize } = this.props
    setSiteSubsitesPage(page)
    setSiteSubsitesPageSize(pageSize)
    loadSiteSubsites({
      id: site.data.id,
    })
  }

  componentDidMount() {
    const { site, loadSiteSubsites } = this.props
    loadSiteSubsites({
      id: site.data.id,
    })
  }

  render() {
    const { history, site, subsites } = this.props
    const loading = isLoading(subsites.state)

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
              {/*<div className="text-right">
                <Pagination
                  total={subsites.count}
                  current={subsites.page}
                  pageSize={subsites.pageSize}
                  onChange={this.handleChangeSiteSubsitesPage}
                />
              </div>*/}
            </React.Fragment>
          }
        </Spin>
      </div>
    )
  }

}

const selector = createStructuredSelector({
  site: selectCurrentSite,
  subsites: selectSubsites,
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
