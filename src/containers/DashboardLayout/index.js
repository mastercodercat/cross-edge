import React, { Component } from 'react'
import { Layout } from 'antd'

import Sidebar from 'components/Sidebar'
import StyleWrapper from './style'


const { Header, Content } = Layout

class DashboardLayout extends Component {

  render() {
    const { children } = this.props
    const appHeight = window.innerHeight;

    return (
      <StyleWrapper>
        <Layout style={{ height: appHeight, flexDirection: 'row', overflowX: 'hidden' }}>
          <Sidebar />
          <Layout>
            <Header className="topbar" />
            <Content>
              {children}
            </Content>
          </Layout>
        </Layout>
      </StyleWrapper>
    )
  }
}

export default DashboardLayout
