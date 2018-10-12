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
import {
  loadSites,
  setSitesPage,
  setSitesPageSize,
  selectSites,
} from 'store/modules/sites'
import { isLoading } from 'utils/state-helpers'


export class BusinessProcessModule extends Component {

  static propTypes = {
    sites: ImmutablePropTypes.record.isRequired,
    loadSites: PropTypes.func.isRequired,
    setSitesPage: PropTypes.func.isRequired,
    setSitesPageSize: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.loadSites()
  }

  render() {
    const { sites, history } = this.props
    const loading = isLoading(sites.state)

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
              </Row>
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
})

const actions = {
  loadSites,
  setSitesPage,
  setSitesPageSize,
}

export default compose(
  withRouter,
  connect(selector, actions),
)(BusinessProcessModule)
