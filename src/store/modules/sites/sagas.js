import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios';

import { API_BASE_URL } from 'config/base'

import {
  LOAD_SITES,
} from './constants'
import {
  loadSitesSuccess,
  loadSitesFail,
} from './reducer'


const doLoadSites = function* (action) {
  try {
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/mdm/site/list`,
    )
    yield put(loadSitesSuccess(response.data))
  } catch (error) {
    yield put(loadSitesFail(error.response ? error.response.data : {}))
  }
}

export const saga = function* () {
  yield takeLatest(LOAD_SITES, doLoadSites)
}
