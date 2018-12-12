import Immutable from 'immutable'

import { PaginatedListData } from 'store/common/models'


export const Notification = Immutable.Record({
  id: 0,
  title: '',
})

export const State = Immutable.Record({
  notifications: PaginatedListData(),
  notificationIds: [],
  notificationsChangedByLastLoad: false,
})
