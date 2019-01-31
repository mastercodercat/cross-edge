import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Dropdown, Menu } from 'antd'

import Logo from 'components/Logo'
import NotificationMenu from 'components/NotificationMenu'
import StyleWrapper from './style'


const { Header } = Layout

class Topbar extends Component {

  static propTypes = {
    username: PropTypes.string.isRequired,
    onCommand: PropTypes.func.isRequired,
    isMobile: PropTypes.bool,
    onToggleCollapse: PropTypes.func.isRequired,
    onClickNotifications: PropTypes.func.isRequired,
  }

  handleTriggerCommand = (command, e) => {
    if (e) {
      e.preventDefault()
    }

    this.props.onCommand(command)
  }

  handleClickUserMenu = ({ item, key }) => {
    this.handleTriggerCommand(key)
  }

  handleClickNotifications = () => {
    this.props.onClickNotifications()
  }

  render() {
    const { username, onToggleCollapse, isMobile } = this.props

    const userMenu = (
      <Menu onClick={this.handleClickUserMenu}>
        <Menu.Item key="signout">
          Sign out
        </Menu.Item>
      </Menu>
    )

    const notificationsMenu = <NotificationMenu />

    return (
      <StyleWrapper>
        <Header className="topbar">
          <div className="logoWrapper">
            <Logo color="white" />
          </div>

          <div className="topbarContent adp-flex">
            <div className="adp-flex-left">
              {
                !isMobile &&
                <div>
                  <button
                    className="ion-navicon siderTriggerBtn with-icon with-pointer"
                    onClick={onToggleCollapse}
                  />
                </div>
              }
            </div>

            <div className="adp-flex-right">
              <span className="notification-button-wrapper has-notifications">
                <Dropdown overlay={notificationsMenu} trigger={['click']}>
                  <button className="notification-button with-icon with-pointer">
                    <i className="fa fa-bell" />
                  </button>
                </Dropdown>
              </span>

              <Dropdown overlay={userMenu}>
                <a className="user-menu-link" href="" onClick={this.handleTriggerCommand.bind(this, 'user')}>
                  <i className="fa fa-user icon-user" /><span className="user-menu-username">{username}</span> <i className="fa fa-chevron-down" />
                </a>
              </Dropdown>
            </div>
          </div>
        </Header>
      </StyleWrapper>
    )
  }
}

export default Topbar
