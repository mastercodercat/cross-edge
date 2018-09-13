import React, { Component } from 'react'
import { Layout } from 'antd'

import Topbar from 'components/Topbar'
import Sidebar from 'components/Sidebar'
import StyleWrapper from './style'


class DashboardLayout extends Component {

  render() {
    const { children } = this.props
    const appHeight = window.innerHeight;

    return (
      <StyleWrapper>
        <Layout style={{ height: appHeight, flexDirection: 'row', overflowX: 'hidden' }}>
          <Sidebar />
          <Layout>
            <Topbar />
            {children}
          </Layout>
        </Layout>
      </StyleWrapper>
    )
  }
}

export default DashboardLayout
