import { takeLatest, call, put, select } from 'redux-saga/effects'
import axios from 'axios'

import { API_BASE_URL } from 'config/base'

import {
  LOAD_CHANNELS,
  LOAD_CHANNEL,
  LOAD_CHANNEL_ENTRIES,
  SEARCH_CHANNEL_ENTRIES,
} from './constants'
import {
  loadChannelsSuccess,
  loadChannelsFail,
  loadChannelSuccess,
  loadChannelFail,
  loadChannelEntriesSuccess,
  loadChannelEntriesFail,
  searchChannelEntriesSuccess,
  searchChannelEntriesFail,
} from './reducer'
import {
  selectChannels,
  selectCurrentChannelEntries,
} from './selectors'


const doLoadChannels = function* (action) {
  try {
    const channelListData = yield select(selectChannels)
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/channels/list/` +
      `?page=${channelListData.page}&page-size=${channelListData.pageSize}`,
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
  try {
    const { channelId } = action.payload
    const currentChannelEntriesObj = yield select(selectCurrentChannelEntries)

    const response = yield call(
      axios.get,
      `${API_BASE_URL}/channels/channelentry/${channelId}/` +
      `?page=${currentChannelEntriesObj.page}&page-size=${currentChannelEntriesObj.pageSize}`,
    )
    yield put(loadChannelEntriesSuccess(response.data))
  } catch (error) {
    yield put(loadChannelEntriesFail(error.response ? error.response.data : {}))
  }
}

const doSearchChannelEntries = function* (action) {
  const { serialNumber } = action.payload
  try {
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/channels/channelentry/search/${serialNumber}/`,
    )
    yield put(searchChannelEntriesSuccess(response.data))
  } catch (error) {
    yield put(searchChannelEntriesFail(error.response ? error.response.data : {}))
  }
}

export const saga = function* () {
  yield takeLatest(LOAD_CHANNELS, doLoadChannels)
  yield takeLatest(LOAD_CHANNEL, doLoadChannel)
  yield takeLatest(LOAD_CHANNEL_ENTRIES, doLoadChannelEntries)
  yield takeLatest(SEARCH_CHANNEL_ENTRIES, doSearchChannelEntries)
}
