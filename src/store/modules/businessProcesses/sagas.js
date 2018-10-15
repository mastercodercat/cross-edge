import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'

import { API_BASE_URL } from 'config/base'

import {
  LOAD_BUSINESS_PROCESSES,
  LOAD_BUSINESS_PROCESS,
} from './constants'
import {
  loadBusinessProcessesSuccess,
  loadBusinessProcessesFail,
  loadBusinessProcessSuccess,
  loadBusinessProcessFail,
} from './reducer'


const doLoadBusinessProcesses = function* (action) {
  try {
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/bpm/list/`,
    )
    yield put(loadBusinessProcessesSuccess(response.data))
  } catch (error) {
    yield put(loadBusinessProcessesFail(error.response ? error.response.data : {}))
  }
}

const doLoadBusinessProcess = function* (action) {
  const { name } = action.payload

  try {
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/bpm/detail/${name}/`,
    )
    yield put(loadBusinessProcessSuccess(response.data))
  } catch (error) {
    yield put(loadBusinessProcessFail(error.response ? error.response.data : {}))
  }
}

export const saga = function* () {
  yield takeLatest(LOAD_BUSINESS_PROCESSES, doLoadBusinessProcesses)
  yield takeLatest(LOAD_BUSINESS_PROCESS, doLoadBusinessProcess)
}
