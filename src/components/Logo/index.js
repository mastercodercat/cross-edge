import React, { Component } from 'react'

import logoColor from 'images/logo-color.png'
import logoWhite from 'images/logo-white.png'
import StyleWrapper from './style'


const Logo = ({ color }) => (
  <StyleWrapper>
    <img src={color == 'white' ? logoWhite : logoColor} />
  </StyleWrapper>
)

export default Logo
