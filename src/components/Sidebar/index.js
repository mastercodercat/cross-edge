import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import PropTypes from 'prop-types'

import StyleWrapper from './style'


const { Sider } = Layout
// const SubMenu = Menu.SubMenu;

class Sidebar extends Component {

  static propTypes = {
    collapsed: PropTypes.bool,
    onToggleCollapse: PropTypes.func,
  }

  render() {
    const { collapsed, onToggleCollapse } = this.props

    return (
      <Sider
        width={240}
        collapsible
        trigger={null}
        collapsed={collapsed}
        onCollapse={onToggleCollapse}
      >
        <StyleWrapper>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="cluster" />
              <span>Channels</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="edit" />
              <span>Test</span>
            </Menu.Item>
          </Menu>
        </StyleWrapper>
      </Sider>
    )
  }
}

export default Sidebar
