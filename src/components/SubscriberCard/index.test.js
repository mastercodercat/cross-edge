import React from 'react'
import { mount } from 'enzyme'

import { Subscriber } from 'store/modules/bpm'
import { mockHistory } from 'test/helpers'
import SubscriberCard from './index'


const sb = Subscriber({
  id: 5,
  name: 'Test Subscriber',
  description: 'Description for test subscriber',
})

it('should render correctly', () => {
  const wrapper = mount(<SubscriberCard
    data={sb}
    history={mockHistory}
  />)

  expect(wrapper.text()).toEqual(expect.stringContaining(sb.name))
  expect(wrapper.text()).toEqual(expect.stringContaining(sb.description))
})

it('should push correct route to history when any of the buttons clicked', () => {
  const mockHistory = {
    push: jest.fn()
  }
  const wrapper = mount(<SubscriberCard
    data={sb}
    history={mockHistory}
  />)

  wrapper.find('button').at(0).simulate('click')
  expect(mockHistory.push.mock.calls[0][0]).toEqual(`/subscribers/${sb.id}/sites`)

  wrapper.find('button').at(1).simulate('click')
  expect(mockHistory.push.mock.calls[1][0]).toEqual(`/subscribers/${sb.id}/partners`)
})
