import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

import StyleWrapper from './style'


const { Sider } = Layout

class Sidebar extends Component {

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

    return (
      <Sider
        width={240}
        collapsible
        trigger={null}
        collapsed={collapsed}
        onCollapse={onToggleCollapse}
      >
        <StyleWrapper>
          <Menu theme="dark" selectedKeys={[location.pathname]} mode="inline" onClick={this.handleClickMenu}>
            <Menu.Item key="/channels">
              <Icon type="cluster" />
              <span>Channel Manager</span>
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
