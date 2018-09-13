import React, { Component } from 'react'

import Logo from 'components/Logo'
import StyleWrapper from './style'


class Sidebar extends Component {

  render() {
    return (
      <StyleWrapper>
        <div className="logoWrapper">
          <Logo color="white" />
        </div>
        <div className="menu">
        </div>
      </StyleWrapper>
    )
  }
}

export default Sidebar
