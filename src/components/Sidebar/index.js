import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'

import Logo from 'components/Logo'
import StyleWrapper from './style'


const { Sider } = Layout
// const SubMenu = Menu.SubMenu;

class Sidebar extends Component {

  state = {
    collapsed: false
  }

  onCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        width={240}
      >
        <StyleWrapper>
          <div className="logoWrapper">
            <Logo color="white" />
          </div>
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
