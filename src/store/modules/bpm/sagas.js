import { takeLatest, call, put, select } from 'redux-saga/effects'
import axios from 'axios'

import { API_BASE_URL } from 'config/base'

import {
  LOAD_HOME,
  LOAD_SUBSCRIBER_OR_GET_FROM_CACHE,
  LOAD_SUBSCRIBER,
} from './constants'
import {
  loadHomeSuccess,
  loadHomeFail,
  loadSubscriber,
  loadSubscriberSuccess,
  loadSubscriberFail,
  setCurrentSubscriber,
} from './reducer'
import {
  selectHomeContent,
} from './selectors'


const doLoadHome = function* (action) {
  try {
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/bpm/home/?${Math.floor(Math.random() * 9000000 + 1000000)}`
    )
    yield put(loadHomeSuccess(response.data))
  } catch (error) {
    yield put(loadHomeFail(error.response ? error.response.data : {}))
  }
}

const doLoadSubscriberOrGetFromCache = function* (action) {
  const { id } = action.payload

  const homeContent = yield select(selectHomeContent)
  const subscriber = homeContent.data.find(record => (
    record.id === parseInt(id, 10) &&
    record.mdm_type === 'subscriber'
  ))
  if (subscriber) {
    yield put(setCurrentSubscriber(subscriber))
  } else {
    yield put(loadSubscriber({ id }))
  }
}

const doLoadSubscriber = function* (action) {
  try {
    const { id } = action.payload
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/mdm/subscriber/detail/${id}/`
    )
    yield put(loadSubscriberSuccess(response.data))
  } catch (error) {
    yield put(loadSubscriberFail(error.response ? error.response.data : {}))
  }
}

export const saga = function* () {
  yield takeLatest(LOAD_HOME, doLoadHome)
  yield takeLatest(LOAD_SUBSCRIBER_OR_GET_FROM_CACHE, doLoadSubscriberOrGetFromCache)
  yield takeLatest(LOAD_SUBSCRIBER, doLoadSubscriber)
}
