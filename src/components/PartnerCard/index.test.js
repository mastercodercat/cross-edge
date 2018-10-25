import React from 'react'
import { mount } from 'enzyme'

import { Partner } from 'store/modules/partners'
import { mockHistory } from 'test/helpers'
import PartnerCard from './index'


const pt = Partner({
  id: 10,
  name: 'Test Partner',
  has_business_processes: true,
})

it('should render correctly', () => {
  const wrapper = mount(<PartnerCard
    data={pt}
    history={mockHistory}
  />)

  expect(wrapper.text()).toEqual(expect.stringContaining(pt.name))
})

it('should push correct route to history when any of the buttons clicked', () => {
  const mockHistory = {
    push: jest.fn()
  }
  const wrapper = mount(<PartnerCard
    data={pt}
    history={mockHistory}
  />)

  wrapper.find('button').at(0).simulate('click')
  expect(mockHistory.push.mock.calls[0][0]).toEqual(`/partners/${pt.id}/sites`)

  wrapper.find('button').at(1).simulate('click')
  expect(mockHistory.push.mock.calls[1][0]).toEqual(`/partners/${pt.id}/business-processes`)
})
