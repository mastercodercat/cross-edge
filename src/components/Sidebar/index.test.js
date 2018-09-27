import React from 'react'
import { mount } from 'enzyme'
import { Menu } from 'antd'

import { Sidebar } from './index'


it('should render without any errors', () => {
  const wrapper = mount(<Sidebar
    collapsed={false}
    onToggleCollapse={e => e}
    location={{ pathname: '/' }}
  />)

  expect(wrapper.contains(Menu)).toBe(true)
})
