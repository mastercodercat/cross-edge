import { takeLatest, call, put, select } from 'redux-saga/effects'
import axios from 'axios'

import { API_BASE_URL } from 'config/base'

import {
  LOAD_PARTNERS,
  LOAD_PARTNER_OR_GET_FROM_CACHE,
  LOAD_PARTNER,
  // PARENT_TYPES,
} from './constants'
import {
  loadPartnersSuccess,
  loadPartnersFail,
  loadPartner,
  loadPartnerSuccess,
  loadPartnerFail,
  setCurrentPartner,
} from './reducer'
import {
  selectPartners,
} from './selectors'


const doLoadPartners = function* (action) {
  try {
    // const { parentId, parentType } = action.payload
    // if (PARENT_TYPES.indexOf(parentType) === -1) {
    //   throw new Error('Invalid parent type for partner list')
    // }

    const response = yield call(
      axios.get,
      `${API_BASE_URL}/mdm/partner/list/`,
    )
    yield put(loadPartnersSuccess(response.data))
  } catch (error) {
    yield put(loadPartnersFail(error.response ? error.response.data : {}))
  }
}

const doLoadPartnerOrGetFromCache = function* (action) {
  const { id } = action.payload
  const loadedPartners = yield select(selectPartners)
  const partner = loadedPartners.data.find(_partner => _partner.id === parseInt(id, 10))
  if (partner) {
    yield put(setCurrentPartner(partner))
  } else {
    yield put(loadPartner({ id }))
  }
}

const doLoadPartner = function* (action) {
  const { id } = action.payload

  try {
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/mdm/partner/detail/${id}/`,
    )
    yield put(loadPartnerSuccess(response.data))
  } catch (error) {
    yield put(loadPartnerFail(error.response ? error.response.data : {}))
  }
}

export const saga = function* () {
  yield takeLatest(LOAD_PARTNERS, doLoadPartners)
  yield takeLatest(LOAD_PARTNER_OR_GET_FROM_CACHE, doLoadPartnerOrGetFromCache)
  yield takeLatest(LOAD_PARTNER, doLoadPartner)
}
