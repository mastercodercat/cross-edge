import React from 'react'
import { mount } from 'enzyme'

import { NOTIFICATION_ICONS } from 'config/base'
import { Notification } from 'store/modules/notifications'
import MessageListItem from './index'


const message = Notification({
  id: 11,
  level: 'info',
  message: 'This is a test message',
  created: '2018-12-10T10:10:10.000Z',
})

it('should render without any errors', () => {
  const wrapper = mount(<MessageListItem
    message={message}
    selected={false}
    onClick={e => e}
  />)

  expect(wrapper.text()).toEqual(expect.stringContaining(message.message))
})

it('should render correct icons', () => {
  const levels = Object.keys(NOTIFICATION_ICONS)
  for (let i = 0; i < levels.length; i += 1) {
    const level = levels[i]
    const icon = NOTIFICATION_ICONS[level]
    const _message = message.set('level', level)

    const wrapper = mount(<MessageListItem
      message={_message}
      selected={false}
      onClick={e => e}
    />)

    expect(wrapper.find(`.fa-${icon}`).length).not.toBe(0)
  }
})

it('should render selected status if specified', () => {
  const wrapper = mount(<MessageListItem
    message={message}
    selected
    onClick={e => e}
  />)

  expect(wrapper.find('.selected').length).not.toBe(0)
})

it('should invoke handler on click', () => {
  const onClick = jest.fn()
  const wrapper = mount(<MessageListItem
    message={message}
    selected
    onClick={onClick}
  />)

  wrapper.simulate('click')
  expect(onClick.mock.calls).toBeTruthy()
})
