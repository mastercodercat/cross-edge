import React, { Component } from 'react'
import { Row, Col, Spin, Icon } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withRouter } from 'react-router'

import SpinnerDummyContent from 'components/SpinnerDummyContent'
import BusinessProcessCard from 'components/BusinessProcessCard'
import {
  selectCurrentSite,
  selectCurrentSubsite,
  loadSubsiteOrGetFromCache,
} from 'store/modules/sites'
import {
  selectBusinessProcesses,
  loadBusinessProcesses,
  setBusinessProcessesPage,
  setBusinessProcessesPageSize,
} from 'store/modules/businessProcesses'
import { isLoading } from 'utils/state-helpers'


export class SiteBusinessProcesses extends Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    site: ImmutablePropTypes.record.isRequired,
    subsite: ImmutablePropTypes.record.isRequired,
    businessProcesses: ImmutablePropTypes.record.isRequired,
    loadSubsiteOrGetFromCache: PropTypes.func.isRequired,
    loadBusinessProcesses: PropTypes.func.isRequired,
    setBusinessProcessesPage: PropTypes.func.isRequired,
    setBusinessProcessesPageSize: PropTypes.func.isRequired,
  }

  handleChangeBusinessProcessesPage = (page, pageSize) => {
    const { loadBusinessProcesses, setBusinessProcessesPage, setBusinessProcessesPageSize } = this.props
    setBusinessProcessesPage(page)
    setBusinessProcessesPageSize(pageSize)
    loadBusinessProcesses()
  }

  componentDidMount() {
    const { match, loadSubsiteOrGetFromCache, loadBusinessProcesses } = this.props

    if (match.params.subsiteId) {
      loadSubsiteOrGetFromCache({
        id: match.params.subsiteId,
      })
    }

    loadBusinessProcesses({
      siteId: match.params.siteId,
      subsiteId: match.params.subsiteId,
    })
  }

  render() {
    const { match, history, site, subsite, businessProcesses } = this.props
    const currentSite = match.params.siteId ? site : subsite
    const loading = isLoading(businessProcesses.state)

    if (isLoading(currentSite.state)) {
      return <Spin spinning={loading}>
        <SpinnerDummyContent />
      </Spin>
    }

    return (
      <div>
        <h1>
          <Icon type="profile" /> Business Processes for {currentSite.data.name}
        </h1>

        <Spin spinning={loading}>
          {
            loading ?
            <SpinnerDummyContent /> :
            <React.Fragment>
              {
                businessProcesses.data.size > 0 ?
                <Row gutter={15}>
                  {
                    businessProcesses.data.map(businessProcess => (
                      <Col key={businessProcess.id} sm={24} md={12} lg={8}>
                        <BusinessProcessCard
                          businessProcess={businessProcess}
                          onClickGo={() => history.push(`/business-processes/${businessProcess.name}`)}
                        />
                      </Col>
                    ))
                  }
                </Row>
                :
                <div>No business processes found.</div>
              }
              {/*<div className="text-right">
                <Pagination
                  total={businessProcesses.count}
                  current={businessProcesses.page}
                  pageSize={businessProcesses.pageSize}
                  onChange={this.handleChangeBusinessProcessesPage}
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
  subsite: selectCurrentSubsite,
  businessProcesses: selectBusinessProcesses,
})

const actions = {
  loadSubsiteOrGetFromCache,
  loadBusinessProcesses,
  setBusinessProcessesPage,
  setBusinessProcessesPageSize,
}

export default compose(
  withRouter,
  connect(selector, actions),
)(SiteBusinessProcesses)
