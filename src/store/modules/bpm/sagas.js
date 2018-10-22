import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'

import { API_BASE_URL } from 'config/base'

import {
  LOAD_HOME,
} from './constants'
import {
  loadHomeSuccess,
  loadHomeFail,
} from './reducer'


const doLoadHome = function* (action) {
  try {
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/bpm/home/?${Math.floor(Math.random() * 100000 + 999999)}`
    )
    yield put(loadHomeSuccess(response.data))
  } catch (error) {
    yield put(loadHomeFail(error.response ? error.response.data : {}))
  }
}

export const saga = function* () {
  yield takeLatest(LOAD_HOME, doLoadHome)
}
