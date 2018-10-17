import { takeLatest, call, put, select } from 'redux-saga/effects'
import axios from 'axios'

import { API_BASE_URL } from 'config/base'

import {
  LOAD_SITES,
  LOAD_SITE_OR_GET_FROM_CACHE,
  LOAD_SITE,
  LOAD_SITE_SUBSITES,
  LOAD_PARTNER_SUBSITES,
  LOAD_SUBSITE_OR_GET_FROM_CACHE,
  LOAD_SUBSITE,
} from './constants'
import {
  loadSitesSuccess,
  loadSitesFail,
  loadSite,
  loadSiteSuccess,
  loadSiteFail,
  setCurrentSite,
  loadSiteSubsitesSuccess,
  loadSiteSubsitesFail,
  loadPartnerSubsitesSuccess,
  loadPartnerSubsitesFail,
  loadSubsite,
  loadSubsiteSuccess,
  loadSubsiteFail,
  setCurrentSubsite,
} from './reducer'
import {
  selectSites,
  selectSubsites,
} from './selectors'


const doLoadSites = function* (action) {
  try {
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/mdm/site/list/`,
    )
    yield put(loadSitesSuccess(response.data))
  } catch (error) {
    yield put(loadSitesFail(error.response ? error.response.data : {}))
  }
}

const doLoadSiteOrGetFromCache = function* (action) {
  const { id } = action.payload
  const loadedSites = yield select(selectSites)
  const site = loadedSites.data.find(_site => _site.id === parseInt(id, 10))
  if (site) {
    yield put(setCurrentSite(site))
  } else {
    yield put(loadSite({ id }))
  }
}

const doLoadSite = function* (action) {
  const { id } = action.payload
  
  try {
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/mdm/site/detail/${id}/`,
    )
    yield put(loadSiteSuccess(response.data))
  } catch (error) {
    yield put(loadSiteFail(error.response ? error.response.data : {}))
  }
}

const doLoadSiteSubsites = function* (action) {
  try {
    const { id } = action.payload
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/mdm/subsite/by-site/${id}/`,
    )
    yield put(loadSiteSubsitesSuccess(response.data))
  } catch (error) {
    yield put(loadSiteSubsitesFail(error.response ? error.response.data : {}))
  }
}

const doLoadPartnerSubsites = function* (action) {
  try {
    const { id } = action.payload
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/mdm/subsite/by-partner/${id}/`,
    )
    yield put(loadPartnerSubsitesSuccess(response.data))
  } catch (error) {
    yield put(loadPartnerSubsitesFail(error.response ? error.response.data : {}))
  }
}

const doLoadSubsiteOrGetFromCache = function* (action) {
  const { id } = action.payload
  const loadedSubsites = yield select(selectSubsites)
  const subsite = loadedSubsites.data.find(_subsite => _subsite.id === parseInt(id, 10))
  if (subsite) {
    yield put(setCurrentSubsite(subsite))
  } else {
    yield put(loadSubsite({ id }))
  }
}

const doLoadSubsite = function* (action) {
  const { id } = action.payload
  
  try {
    const response = yield call(
      axios.get,
      `${API_BASE_URL}/mdm/subsite/detail/${id}/`,
    )
    yield put(loadSubsiteSuccess(response.data))
  } catch (error) {
    yield put(loadSubsiteFail(error.response ? error.response.data : {}))
  }
}

export const saga = function* () {
  yield takeLatest(LOAD_SITES, doLoadSites)
  yield takeLatest(LOAD_SITE_OR_GET_FROM_CACHE, doLoadSiteOrGetFromCache)
  yield takeLatest(LOAD_SITE, doLoadSite)
  yield takeLatest(LOAD_SITE_SUBSITES, doLoadSiteSubsites)
  yield takeLatest(LOAD_PARTNER_SUBSITES, doLoadPartnerSubsites)
  yield takeLatest(LOAD_SUBSITE_OR_GET_FROM_CACHE, doLoadSubsiteOrGetFromCache)
  yield takeLatest(LOAD_SUBSITE, doLoadSubsite)
}
