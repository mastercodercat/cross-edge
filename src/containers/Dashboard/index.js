import React, { Component } from 'react'
import { Row, Col, Button } from 'antd'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

import { API_BACK_END_URL, API_BASE_URL } from 'config/base'
import { PageTitle } from 'components/common'
import { Card } from 'components/Card'
import StyleWrapper from './style'


class Dashboard extends Component {

  goToChannelManager = () => {
    this.props.history.push('/channels')
  }

  goToBPM = () => {
    this.props.history.push('/business-process-module')
  }

  goToSwapperView = () => {
    window.open(`${API_BASE_URL}/`, '_blank')
  }

  goToAdmin = () => {
    window.open(`${API_BACK_END_URL}/admin/`, '_blank')
  }

  render() {
    return (
      <StyleWrapper>
        <PageTitle>
          <i className="fal fa-tachometer-alt" /> Dashboard
        </PageTitle>

        <p className="description">Welcome to Adept Packing Platform!</p>

        <Row gutter={30} type="flex">
          <Col sm={24} md={12} lg={6}>
            <Card
              icon="fal fa-sitemap"
              title="Channel Manager"
              description="View Distribution Channel details and search identifiers to ensure they are in the correct Channels."
              buttons={[
                <Button block type="primary" onClick={this.goToChannelManager}>Go</Button>
              ]}
              minHeight={65}
              flexMode
            />
          </Col>

          <Col sm={24} md={12} lg={6}>
            <Card
              icon="fal fa-barcode"
              title="Business Processes"
              description="Conduct Aggregation, Shipping, Receiving and other configured Business Processes for your organization."
              buttons={[
                <Button block type="primary" onClick={this.goToBPM}>Go</Button>
              ]}
              minHeight={65}
              flexMode
            />
          </Col>

          <Col sm={24} md={12} lg={6}>
            <Card
              icon="fal fa-code"
              title="API Swagger"
              description="View Adept Connect's REST API documentation and learn how you can take advantage of a rich set of endpoints for your own systems and user software."
              buttons={[
                <Button block type="primary" onClick={this.goToSwapperView}>Go</Button>
              ]}
              minHeight={65}
              flexMode
            />
          </Col>

          <Col sm={24} md={12} lg={6}>
            <Card
              icon="fal fa-cogs"
              title="Admin"
              description="Navigate to Adept Connect's Administration Module to view Configuration, Logging, and Auditing Information."
              buttons={[
                <Button block type="primary" onClick={this.goToAdmin}>Go</Button>
              ]}
              minHeight={65}
              flexMode
            />
          </Col>
        </Row>
      </StyleWrapper>
    )
  }
}

export default compose(
  withRouter,
)(Dashboard)
