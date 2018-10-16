import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'

import { API_BASE_URL } from 'config/base'

import {
  LOAD_PARTNERS,
} from './constants'
import {
  loadPartnersSuccess,
  loadPartnersFail,
} from './reducer'


const doLoadPartners = function* (action) {
  try {
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/mdm/partner/list/`,
    )
    yield put(loadPartnersSuccess(response.data))
  } catch (error) {
    yield put(loadPartnersFail(error.response ? error.response.data : {}))
  }
}

export const saga = function* () {
  yield takeLatest(LOAD_PARTNERS, doLoadPartners)
}
