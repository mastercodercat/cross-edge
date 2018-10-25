import React from 'react'
import { mount } from 'enzyme'

import { BusinessProcess } from 'store/modules/BusinessProcesses'
import { mockHistory } from 'test/helpers'
import BusinessProcessCard from './index'


const bp = BusinessProcess({
  name: 'Test BP',
  description: 'Description for Test BP'
})

it('should render correctly', () => {
  const wrapper = mount(<BusinessProcessCard
    data={bp}
    history={mockHistory}
  />)

  expect(wrapper.find('.title').text()).toEqual(bp.name)
  expect(wrapper.find('.description').text()).toEqual(bp.description)
})

it('should push business process route to history when Go button clicked', () => {
  const mockHistory = {
    push: jest.fn()
  }
  const wrapper = mount(<BusinessProcessCard
    data={bp}
    history={mockHistory}
  />)

  wrapper.find('button').simulate('click')

  expect(mockHistory.push.mock.calls[0][0]).toEqual(`/business-processes/${bp.name}`)
})
