import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'

import { API_BASE_URL } from 'config/base'

import {
  LOAD_NOTIFICATIONS,
} from './constants'
import {
  loadNotificationsSuccess,
  loadNotificationsFail,
} from './reducer'


const doLoadNotifications = function* (action) {
  try {
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/bpm/notifications/`
    )
    yield put(loadNotificationsSuccess(response.data))
  } catch (error) {
    yield put(loadNotificationsFail(error.response ? error.response.data : {}))
  }
}

export const saga = function* () {
  yield takeLatest(LOAD_NOTIFICATIONS, doLoadNotifications)
}
