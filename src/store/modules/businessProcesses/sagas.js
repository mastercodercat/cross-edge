import { takeLatest, call, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import axios from 'axios'

import { API_BASE_URL } from 'config/base'

import {
  LOAD_BUSINESS_PROCESSES,
  LOAD_BUSINESS_PROCESS,
  SUBMIT_DATA,
  PARENT_TYPES,
} from './constants'
import {
  loadBusinessProcessesSuccess,
  loadBusinessProcessesFail,
  loadBusinessProcessSuccess,
  loadBusinessProcessFail,
  submitDataSuccess,
  submitDataFail,
} from './reducer'


const doLoadBusinessProcesses = function* (action) {
  try {
    let { parentId, parentType } = action.payload
    if (PARENT_TYPES.indexOf(parentType) === -1) {
      throw new Error('Invalid parent type for business process list')
    }

    const response = yield call(
      axios.get,
      `${API_BASE_URL}/bpm/filter/?${parentType}_id=${parentId}`
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
      `${API_BASE_URL}/bpm/filter/?name=${name}`,
    )
    yield put(loadBusinessProcessSuccess({
      results: [
        {
          ...response.data.results[0],
          steps: [
            [
              { label: 'Scan or Enter Identifiers', type: 'scan-multiple', name: 'data' },
              { label: 'Scan or Enter Parent Identifier', type: 'scan-single', name: 'root' }, ///
            ],
            [
              { label: 'Scan or Enter Parent Identifier', type: 'scan-single', name: 'parent' },
            ],
            [
              { type: 'display', name: 'data', parentField: 'parent' },
            ],
          ]
        }
      ]
    }))
  } catch (error) {
    yield put(loadBusinessProcessFail(error.response ? error.response.data : {}))
  }
}

const doSubmitData = function* (action) {
  try {
    const response = yield call(
      axios.post,
      `${API_BASE_URL}/bpm/`,
      action.payload
    )
    yield put(submitDataSuccess(response.data))

    yield put(push('/business-process-module'))
  } catch (error) {
    yield put(submitDataFail(error.response ? error.response.data : {}))
  }
}

export const saga = function* () {
  yield takeLatest(LOAD_BUSINESS_PROCESSES, doLoadBusinessProcesses)
  yield takeLatest(LOAD_BUSINESS_PROCESS, doLoadBusinessProcess)
  yield takeLatest(SUBMIT_DATA, doSubmitData)
}
