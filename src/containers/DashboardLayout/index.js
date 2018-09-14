import React, { Component } from 'react'
import { Layout } from 'antd'

import Sidebar from 'components/Sidebar'
import StyleWrapper from './style'


const { Header, Content } = Layout

class DashboardLayout extends Component {

  state = {
    collapsed: false
  }

  onToggleCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    const { children } = this.props
    const { collapsed } = this.state
    const appHeight = window.innerHeight;

    return (
      <StyleWrapper>
        <Layout style={{ height: appHeight, flexDirection: 'row', overflowX: 'hidden' }}>
          <Sidebar collapsed={collapsed} onToggleCollapse={this.onToggleCollapse} />
          <Layout>
            <Header className="topbar" />
            <Content>
              <div className="content-wrapper">
                {children}
              </div>
            </Content>
          </Layout>
        </Layout>
      </StyleWrapper>
    )
  }
}

export default DashboardLayout
