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
  selectSiteSubsites,
  loadSiteSubsites,
} from 'store/modules/sites'
import { isLoading } from 'utils/state-helpers'


export class SiteSubsites extends Component {

  static propTypes = {
    site: ImmutablePropTypes.record.isRequired,
    siteSubsites: ImmutablePropTypes.record.isRequired,
    loadSiteSubsites: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.loadSiteSubsites()
  }

  render() {
    const { site, siteSubsites } = this.props
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
            <Row gutter={15}>
              {
                siteSubsites.data.map(subsite => (
                  <Col key={subsite.id} sm={24} md={12} lg={8}>
                    <SiteCard
                      isSubsite
                      site={subsite}
                      onClickBusinessProcesses={e => e}
                    />
                  </Col>
                ))
              }
            </Row>
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
}

export default compose(
  withRouter,
  connect(selector, actions),
)(SiteSubsites)
