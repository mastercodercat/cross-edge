import React from 'react'
import { mount } from 'enzyme'

import messages from 'test/fixtures/notifications'
import MessageListItem from 'components/MessageListItem'
import { PaginatedListData } from 'store/common/models'
import { REQUEST_SUCCESS } from 'constants.js'
import { Messages } from './index'


it('should render and call loadNotifications when not loaded', () => {
  const loadNotificationsMock = jest.fn()
  const notifications = PaginatedListData()

  mount(<Messages
    loadNotifications={loadNotificationsMock}
    notifications={notifications}
    notificationsChangedByLastLoad
  />)

  expect(loadNotificationsMock.mock.calls).toBeTruthy()
})

it('should render messages when loaded', () => {
  const loadNotificationsMock = jest.fn()
  const notifications = PaginatedListData({
    data: messages,
    state: REQUEST_SUCCESS
  })

  const wrapper = mount(<Messages
    loadNotifications={loadNotificationsMock}
    notifications={notifications}
    notificationsChangedByLastLoad
  />)

  expect(wrapper.find(MessageListItem).length).toEqual(messages.size)
})

it('should be able to filter messages by search keyword', () => {
  const loadNotificationsMock = jest.fn()
  const notifications = PaginatedListData({
    data: messages,
    state: REQUEST_SUCCESS
  })

  const wrapper = mount(<Messages
    loadNotifications={loadNotificationsMock}
    notifications={notifications}
    notificationsChangedByLastLoad
  />)

  wrapper.setState({
    searchKeyword: 'commissioning'
  })

  expect(wrapper.find(MessageListItem).length).toEqual(1)
})
