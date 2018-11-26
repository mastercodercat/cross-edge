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

        <Row gutter={30}>
          <Col sm={24} md={12} lg={6}>
            <Card
              title="Channel Manager"
              description="Description for channel manager"
              buttons={[
                <Button block type="primary" onClick={this.goToChannelManager}>Go</Button>
              ]}
            />
          </Col>

          <Col sm={24} md={12} lg={6}>
            <Card
              title="Business Processes"
              description="Description for Business Processes"
              buttons={[
                <Button block type="primary" onClick={this.goToBPM}>Go</Button>
              ]}
            />
          </Col>

          <Col sm={24} md={12} lg={6}>
            <Card
              title="API Swagger"
              description="Description for API Swagger"
              buttons={[
                <Button block type="primary" onClick={this.goToSwapperView}>Go</Button>
              ]}
            />
          </Col>

          <Col sm={24} md={12} lg={6}>
            <Card
              title="Admin"
              description="Description for Admin"
              buttons={[
                <Button block type="primary" onClick={this.goToAdmin}>Go</Button>
              ]}
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
