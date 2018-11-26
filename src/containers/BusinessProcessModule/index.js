import React, { Component } from 'react'
import { Row, Col, Spin } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

import { PageTitle } from 'components/common'
import SpinnerDummyContent from 'components/SpinnerDummyContent'
import Card from 'components/Card'
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

  componentDidMount() {
    const { loadHome } = this.props
    loadHome()
  }

  render() {
    const { homeContent, history } = this.props
    const loading = isLoading(homeContent.state)

    return (
      <div>
        <PageTitle>
        <i className="fal fa-barcode" /> Business Process Module
        </PageTitle>

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

              {
                homeContent.data.size > 0 ?
                  <Row gutter={15}>
                  {
                    homeContent.data.map(object => {
                      return <Col key={object.id} sm={24} md={12} lg={8}>
                        <Card data={object} history={history} />
                      </Col>
                    })
                  }
                  </Row>
                :
                'No objects found.'
              }
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
