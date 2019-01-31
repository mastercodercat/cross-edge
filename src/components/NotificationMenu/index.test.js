import React from 'react'
import { mount } from 'enzyme'
import { List } from 'immutable'
import { MemoryRouter } from 'react-router-dom'

import { REQUEST_INITIAL, REQUEST_SUCCESS, REQUEST_FAIL } from 'constants.js'
import { PaginatedListData } from 'store/common/models'
import notificationListMock from 'test/fixtures/notifications'
import NotificationMenuItem from 'components/NotificationMenuItem'
import { NotificationMenu } from './index'


it('should show spinner when data not loaded', () => {
  const notifications = PaginatedListData({
    state: REQUEST_INITIAL,
    data: List(),
  })

  const wrapper = mount(<MemoryRouter>
    <NotificationMenu
      notifications={notifications}
      loadNotifications={e => e}
    />
  </MemoryRouter>)

  expect(wrapper.find('.ant-spin').length).not.toEqual(0)
})

it('should show notifications when loaded', () => {
  const notifications = PaginatedListData({
    state: REQUEST_SUCCESS,
    data: notificationListMock,
  })

  const wrapper = mount(<MemoryRouter>
    <NotificationMenu
      notifications={notifications}
      loadNotifications={e => e}
    />
  </MemoryRouter>)

  const notificatioMenuItems = wrapper.find(NotificationMenuItem)

  expect(notificatioMenuItems.length).toEqual(notificationListMock.size)
  for (let i = 0; i < notificationListMock.size; i += 1) {
    expect(notificatioMenuItems.at(i).text()).toContain(notificationListMock.getIn([i, 'message']))
  }
})
