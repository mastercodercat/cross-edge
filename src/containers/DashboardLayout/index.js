import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Layout } from 'antd'
import WindowResizeListener from 'react-window-size-listener'

import Topbar from 'components/Topbar'
import Sidebar from 'components/Sidebar'
import { signOut } from 'store/modules/auth'
import StyleWrapper from './style'


const { Content } = Layout

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

  handleCommand = (command) => {
    const { history, signOut } = this.props
    
    if (command === 'signout') {
      signOut()
      history.push('/signin')
    }
  }

  render() {
    const { children } = this.props
    const { collapsed, appWidth, appHeight } = this.state
    const isMobile = appWidth <= 768

    return (
      <StyleWrapper>
        <Layout style={{ height: appHeight, overflowX: 'hidden' }}>
          <Topbar
            onToggleCollapse={this.handleToggleCollapse}
            isMobile={isMobile}
            onCommand={this.handleCommand}
          />
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

const actions = {
  signOut,
}

export default compose(
  withRouter,
  connect(null, actions)
)(DashboardLayout)
