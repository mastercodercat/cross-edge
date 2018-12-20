import React from 'react'
import { mount } from 'enzyme'

import messages from 'test/fixtures/notifications'
import { PaginatedListData } from 'store/common/models'
import { REQUEST_INITIAL } from 'constants.js'
import { Messages } from './index'


it('should render and call loadNotifications when not loaded', () => {
  const loadNotificationsMock = jest.fn()
  const notifications = PaginatedListData()

  const wrapper = mount(<Messages
    loadNotifications={loadNotificationsMock}
    notifications={notifications}
    notificationsChangedByLastLoad
  />)

  expect(loadNotificationsMock.mock.calls).toBeTruthy()
})
