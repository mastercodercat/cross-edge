import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios';

import { API_BASE_URL } from 'config/base'
import {
  loadChannelsSuccess,
  loadChannelsFail,
} from './reducer'
import {
  LOAD_CHANNELS,
} from './constants'


const doLoadChannels = function* (action) {
  try {
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/channels/`,
    )
    yield put(loadChannelsSuccess(response.data))
  } catch (error) {
    yield put(loadChannelsFail(error.response ? error.response.data : {}))
  }
}

export const saga = function* () {
  yield takeLatest(LOAD_CHANNELS, doLoadChannels)
}
