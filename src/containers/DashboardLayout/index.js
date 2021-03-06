import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'
import { Layout } from 'antd'
import WindowResizeListener from 'react-window-size-listener'

import Topbar from 'components/Topbar'
import Sidebar from 'components/Sidebar'
import { signOut, selectAuthEmail } from 'store/modules/auth'
import StyleWrapper from './style'


const { Content } = Layout

export class DashboardLayout extends Component {

  static propTypes = {
    email: PropTypes.string.isRequired,
    signOut: PropTypes.func.isRequired,
  }

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

  handleClickNotifications = () => {
    this.props.history.push('/messages')
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

  handleClickGoBack = (e) => {
    e.preventDefault()
    this.props.history.goBack()
  }

  render() {
    const { children, email, history } = this.props
    const { collapsed, appWidth, appHeight } = this.state
    const isMobile = appWidth <= 768

    return (
      <StyleWrapper>
        <Layout style={{ height: appHeight, overflowX: 'hidden' }}>
          <Topbar
            username={email}
            isMobile={isMobile}
            onToggleCollapse={this.handleToggleCollapse}
            onCommand={this.handleCommand}
            onClickNotifications={this.handleClickNotifications}
          />
          <Layout>
            <Sidebar
              collapsed={collapsed || isMobile}
              onToggleCollapse={this.handleToggleCollapse}
            />
            <Content>
              <div className="contentWrapper">
                {
                  history.length > 1 &&
                  <div className="goBackLinkWrapper">
                    <a href=":;" onClick={this.handleClickGoBack}>
                      <i className="fa fa-chevron-left" /> Go back
                    </a>
                  </div>
                }

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

const selector = createStructuredSelector({
  email: selectAuthEmail,
})

const actions = {
  signOut,
}

export default compose(
  withRouter,
  connect(selector, actions)
)(DashboardLayout)
