import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Layout, Menu } from 'antd'

import StyleWrapper from './style'


const { Sider } = Layout

export class Sidebar extends Component {

  static propTypes = {
    collapsed: PropTypes.bool,
    onToggleCollapse: PropTypes.func,
  }

  handleClickMenu = ({ item, key }) => {
    const { history } = this.props
    history.push(key)
  }

  render() {
    const { collapsed, onToggleCollapse, location } = this.props

    const menuLabelStyle = {
      display: collapsed ? 'none' : 'inline',
    }

    return (
      <Sider
        width={230}
        collapsible
        trigger={null}
        collapsed={collapsed}
        onCollapse={onToggleCollapse}
      >
        <StyleWrapper>
          <Menu theme="dark" selectedKeys={[location.pathname]} mode="inline" onClick={this.handleClickMenu}>
            <Menu.Item key="/">
              <i className="fal fa-fw fa-tachometer-alt" />
              <span style={menuLabelStyle}> Dashboard</span>
            </Menu.Item>
            <Menu.Item key="/channels">
              <i className="fal fa-fw fa-sitemap" />
              <span style={menuLabelStyle}> Channel Manager</span>
            </Menu.Item>
            <Menu.Item key="/business-process-module">
              <i className="fal fa-fw fa-barcode" />
              <span style={menuLabelStyle}> Business Process Module</span>
            </Menu.Item>
          </Menu>
        </StyleWrapper>
      </Sider>
    )
  }
}

export default compose(
  withRouter,
)(Sidebar)
