import React from 'react'
import { mount } from 'enzyme'

import { ScrollToTop } from './index'


it('should render without any errors', () => {
  const wrapper = mount(<ScrollToTop props={{ path: '/' }}>
    <div>Dummy content</div>
  </ScrollToTop>)

  expect(wrapper.text()).toEqual('Dummy content')
})
