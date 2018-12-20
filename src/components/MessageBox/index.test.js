import React from 'react'
import { mount } from 'enzyme'

import messages from 'test/fixtures/notifications'
import MessageBox from './index'
import MessageListItem from 'components/MessageListItem'


it('should render without any errors', () => {
  const wrapper = mount(<MessageBox messages={messages} />)

  expect(wrapper.find(MessageListItem).length).toEqual(3)
  for (let i = 0; i < 3; i += 1) {
    expect(wrapper.text()).toContain(messages.getIn([i, 'message']))
  }
})

it('should show notice when no messages selected', () => {
  const wrapper = mount(<MessageBox messages={messages} />)

  expect(wrapper.find('.unselectedNotice').text()).toEqual('Select a message')
})

it('should show message when selected', () => {
  const wrapper = mount(<MessageBox messages={messages} />)
  wrapper.instance().handleClickListItem(messages.get(0))

  expect(wrapper.find('.contentArea').text()).toContain(messages.getIn([0, 'message']))
})
