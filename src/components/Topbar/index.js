import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Icon, Dropdown, Menu } from 'antd'

import Logo from 'components/Logo'
import StyleWrapper from './style'


const { Header } = Layout

class Topbar extends Component {

  static propTypes = {
    username: PropTypes.string.isRequired,
    onCommand: PropTypes.func.isRequired,
    onToggleCollapse: PropTypes.func.isRequired,
    isMobile: PropTypes.bool,
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

  render() {
    const { username, onToggleCollapse, isMobile } = this.props

    const userMenu = (
      <Menu onClick={this.handleClickUserMenu}>
        <Menu.Item key="signout">
          Sign out
        </Menu.Item>
      </Menu>
    )

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
                <button className="notification-button with-icon with-pointer">
                  <Icon type="bell" />
                </button>
              </span>

              <Dropdown overlay={userMenu}>
                <a className="user-menu-link" href="" onClick={this.handleTriggerCommand.bind(this, 'user')}>
                  <Icon className="icon-user" type="user" /><span>{username} <Icon type="down" /></span>
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
