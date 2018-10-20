import { takeLatest, call, put, select } from 'redux-saga/effects'
import axios from 'axios'

import { API_BASE_URL } from 'config/base'

import {
  LOAD_SITES,
  LOAD_SITE_OR_GET_FROM_CACHE,
  LOAD_SITE,
  LOAD_SUBSITES,
  LOAD_SUBSITE_OR_GET_FROM_CACHE,
  LOAD_SUBSITE,
  PARENT_TYPES_FOR_SITES,
  PARENT_TYPES_FOR_SUBSITES,
} from './constants'
import {
  loadSitesSuccess,
  loadSitesFail,
  loadSite,
  loadSiteSuccess,
  loadSiteFail,
  setCurrentSite,
  loadSubsitesSuccess,
  loadSubsitesFail,
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
    const { parentId, parentType } = action.payload
    if (PARENT_TYPES_FOR_SITES.indexOf(parentType) === -1) {
      throw new Error('Invalid parent type for site list')
    }

    const response = yield call(
      axios.get,
      `${API_BASE_URL}/mdm/site/by-${parentType}/${parentId}/`,
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

const doLoadSubsites = function* (action) {
  try {
    const { parentId, parentType } = action.payload
    if (PARENT_TYPES_FOR_SUBSITES.indexOf(parentType) === -1) {
      throw new Error('Invalid parent type for subsite list')
    }

    const response = yield call(
      axios.get,
      `${API_BASE_URL}/mdm/subsite/by-${parentType}/${parentId}/`,
    )
    yield put(loadSubsitesSuccess(response.data))
  } catch (error) {
    yield put(loadSubsitesFail(error.response ? error.response.data : {}))
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
  yield takeLatest(LOAD_SUBSITES, doLoadSubsites)
  yield takeLatest(LOAD_SUBSITE_OR_GET_FROM_CACHE, doLoadSubsiteOrGetFromCache)
  yield takeLatest(LOAD_SUBSITE, doLoadSubsite)
}
