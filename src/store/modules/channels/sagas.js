import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios';

import { API_BASE_URL } from 'config/base'
import {
  loadChannelsSuccess,
  loadChannelsFail,
  loadChannelSuccess,
  loadChannelFail,
  loadChannelEntriesSuccess,
  loadChannelEntriesFail,
} from './reducer'
import {
  LOAD_CHANNELS,
  LOAD_CHANNEL,
  LOAD_CHANNEL_ENTRIES,
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

const doLoadChannel = function* (action) {
  const { id } = action.payload
  try {
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/channels/detail/${id}/`,
    )
    yield put(loadChannelSuccess(response.data))
  } catch (error) {
    yield put(loadChannelFail(error.response ? error.response.data : {}))
  }
}

const doLoadChannelEntries = function* (action) {
  const { id } = action.payload
  try {
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/channels/channelentry-channel/${id}/`,
    )
    yield put(loadChannelEntriesSuccess(response.data))
  } catch (error) {
    yield put(loadChannelEntriesFail(error.response ? error.response.data : {}))
  }
}

export const saga = function* () {
  yield takeLatest(LOAD_CHANNELS, doLoadChannels)
  yield takeLatest(LOAD_CHANNEL, doLoadChannel)
  yield takeLatest(LOAD_CHANNEL_ENTRIES, doLoadChannelEntries)
}
