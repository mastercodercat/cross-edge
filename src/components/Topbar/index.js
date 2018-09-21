import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'

import Logo from 'components/Logo'
import StyleWrapper from './style'


const { Header } = Layout

class Topbar extends Component {

  static propTypes = {
    onToggleCollapse: PropTypes.func,
    isMobile: PropTypes.bool,
  }

  handleClickMenu = ({ item, key }) => {
    const { history } = this.props
    history.push(key)
  }

  render() {
    const { onToggleCollapse, isMobile } = this.props

    return (
      <StyleWrapper>
        <Header className="topbar">
          <div className="logoWrapper">
            <Logo color="white" />
          </div>

          <div className="topbarContent adp-flex">
            <div className="adp-flex-left">
              {!isMobile && <div>
                <button
                  className="ion-navicon siderTriggerBtn"
                  onClick={onToggleCollapse}
                  style={{ cursor: 'pointer' }}
                />
              </div>}
            </div>

            <div className="adp-flex-right">
              Icons here
            </div>
          </div>
        </Header>
      </StyleWrapper>
    )
  }
}

export default Topbar
