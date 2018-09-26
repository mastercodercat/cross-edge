import React from 'react'
import { mount } from 'enzyme'

import Logo from './index'
import logoColor from 'images/logo-color.png'
import logoWhite from 'images/logo-white.png'


it('should show colored logo by default', () => {
  const wrapper = mount(<Logo />)

  expect(wrapper.find('img').getDOMNode().src).toEqual(logoColor)
})
