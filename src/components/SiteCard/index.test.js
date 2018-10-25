import React from 'react'
import { mount } from 'enzyme'

import { Site } from 'store/modules/sites'
import { mockHistory } from 'test/helpers'
import SiteCard from './index'


const st = Site({
  id: 10,
  name: 'Test Site',
  description: 'Description for test site',
  has_business_processes: true,
})

it('should render correctly', () => {
  const wrapper = mount(<SiteCard
    data={st}
    history={mockHistory}
  />)

  expect(wrapper.text()).toEqual(expect.stringContaining(st.name))
  expect(wrapper.text()).toEqual(expect.stringContaining(st.description))
})

it('should push correct route to history when any of the buttons clicked', () => {
  const mockHistory = {
    push: jest.fn()
  }
  const wrapper = mount(<SiteCard
    data={st}
    history={mockHistory}
  />)

  wrapper.find('button').at(0).simulate('click')
  expect(mockHistory.push.mock.calls[0][0]).toEqual(`/sites/${st.id}/subsites`)

  wrapper.find('button').at(1).simulate('click')
  expect(mockHistory.push.mock.calls[1][0]).toEqual(`/sites/${st.id}/business-processes`)
})
