import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'

import { API_BASE_URL } from 'config/base'

import {
  AUTH_SIGNIN,
} from './constants'
import {
  signInSuccess,
  signInFail,
} from './reducer'


const doSignIn = function* (action) {
  try {
    const response = yield call(
      axios.post,
      `${API_BASE_URL}/token/`,
      action.payload
    )
    yield put(signInSuccess(response.data))
  } catch (error) {
    yield put(signInFail(error.response ? error.response.data : {}))
  }
}

export const saga = function* () {
  yield takeLatest(AUTH_SIGNIN, doSignIn)
}
