import React, { Component } from 'react'
import { Layout } from 'antd'
import WindowResizeListener from 'react-window-size-listener'

import Logo from 'components/Logo'
import Sidebar from 'components/Sidebar'
import StyleWrapper from './style'


const { Header, Content } = Layout

class DashboardLayout extends Component {

  state = {
    collapsed: false,
    appWidth: window.innerWidth,
    appHeight: window.innerHeight,
  }

  handleToggleCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  handleWindowResize = ({ windowWidth, windowHeight }) => {
    this.setState({
      appWidth: windowWidth,
      appHeight: windowHeight,
    })
  }

  render() {
    const { children } = this.props
    const { collapsed, appWidth, appHeight } = this.state
    const isMobile = appWidth <= 768

    return (
      <StyleWrapper>
        <Layout style={{ height: appHeight, overflowX: 'hidden' }}>
          <Header className="topbar">
            <div className="logoWrapper">
              <Logo color="white" />
            </div>
            {!isMobile && <div>
              <button
                className="ion-navicon siderTriggerBtn"
                onClick={this.handleToggleCollapse}
              />
            </div>}
          </Header>
          <Layout>
            <Sidebar
              collapsed={collapsed || isMobile}
              onToggleCollapse={this.handleToggleCollapse}
            />
            <Content>
              <div className="contentWrapper">
                {children}
              </div>
            </Content>
          </Layout>
          <WindowResizeListener onResize={this.handleWindowResize} />
        </Layout>
      </StyleWrapper>
    )
  }
}

export default DashboardLayout
