import Immutable from 'immutable'
import { createAction, handleActions } from 'redux-actions'
import isEqual from 'lodash/isEqual'

import {
  requestLoopHandlersForGet,
  successAction, failAction,
  convertToListRecord,
} from 'utils/state-helpers'
import { PaginatedListData } from 'store/common/models'

import {
  LOAD_NOTIFICATIONS,
} from './constants'

import {
  Notification,
  State,
} from './models'


/* Initial state */

const initialState = new State({
  notifications: PaginatedListData(),
})

/* Action creators */

export const loadNotifications = createAction(LOAD_NOTIFICATIONS)
export const loadNotificationsSuccess = createAction(successAction(LOAD_NOTIFICATIONS))
export const loadNotificationsFail = createAction(failAction(LOAD_NOTIFICATIONS))

/* Reducer */

export const reducer = handleActions({

  /* Load business processes */

  ...requestLoopHandlersForGet({
    action: LOAD_NOTIFICATIONS,
    dataField: 'notifications',
    initialValue: Immutable.List(),
    getDataFromPayload: payload => convertToListRecord(payload.results, Notification),
    usePagination: true,
    preservePreviousState: true,
    onSuccess: (record, payload) => {
      const notificationIds = payload.results.map(notification => notification.id)
      notificationIds.sort((a, b) => a - b)
      record.set('notificationsChangedByLastLoad', !isEqual(notificationIds, record.notificationIds))
      record.set('notificationIds', notificationIds)
    },
  }),

}, initialState)
