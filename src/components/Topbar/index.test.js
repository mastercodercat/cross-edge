import React from 'react'
import { mount } from 'enzyme'
import { Menu } from 'antd'

import Topbar from './index'


it('should render without errors', () => {
  const wrapper = mount(<Topbar
    username="tester"
    onCommand={e => e}
    onToggleCollapse={e => e}
    onClickNotifications={e => e}
    isMobile={false}
  />)

  expect(wrapper.find('.logoWrapper').length).not.toEqual(0)
  expect(wrapper.find('.topbarContent').length).not.toEqual(0)
  expect(wrapper.text()).toContain('tester')
})
