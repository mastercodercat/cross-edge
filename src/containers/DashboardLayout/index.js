import React, { Component } from 'react'
import { Layout } from 'antd'

import Logo from 'components/Logo'
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
        <Layout style={{ height: appHeight, overflowX: 'hidden' }}>
          <Header className="topbar">
            <div className="logoWrapper">
              <Logo color="white" />
            </div>
          </Header>
          <Layout>
            <Sidebar collapsed={collapsed} onToggleCollapse={this.onToggleCollapse} />
            <Content>
              <div className="contentWrapper">
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
