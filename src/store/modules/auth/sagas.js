import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios';

import {
  signInSuccess,
  signInFail } from './reducer'
import {
  AUTH_SIGNIN } from './constants'


const signIn = function* (action) {
  try {
    const response = yield call(
      axios.post,
      action.payload
    )
    yield put(signInSuccess(response.data))
  } catch (error) {
    yield put(signInFail(error.response ? error.response.data : {}))
  }
}

export const saga = function* () {
  yield takeLatest(AUTH_SIGNIN, signIn)
}
