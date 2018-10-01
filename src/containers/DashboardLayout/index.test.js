import React from 'react'
import { shallow, mount } from 'enzyme'

import { DashboardLayout } from './index'


it('should render its content without errors', () => {
  const wrapper = shallow(
    <DashboardLayout
      email="test@test.com"
      signOut={e => e}
    >
      <div>Test content</div>
    </DashboardLayout>
  )

  expect(wrapper.find('.contentWrapper').text()).toContain('Test content')
})
