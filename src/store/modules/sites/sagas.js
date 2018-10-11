import { takeLatest, call, put, select } from 'redux-saga/effects'
import axios from 'axios';

import { API_BASE_URL } from 'config/base'

import {
  LOAD_SITES,
  LOAD_SITE_OR_GET_FROM_CACHE,
  LOAD_SITE,
} from './constants'
import {
  loadSitesSuccess,
  loadSitesFail,
  loadSite,
  loadSiteSuccess,
  loadSiteFail,
  setCurrentSite,
} from './reducer'
import {
  selectSites
} from './selectors'


const doLoadSites = function* (action) {
  try {
    // const response = yield call(
    //   axios.get,
    //   `${API_BASE_URL}/mdm/site/list`,
    // )
    // yield put(loadSitesSuccess(response.data))
    yield put(loadSitesSuccess({
      count: 0,
      results: [
        {
          id: 1,
          name: 'First Site',
          description: 'Site generated as mock data for testing',
          image: '/images/1.jpg',
        },
        {
          id: 2,
          name: 'Second Site',
          description: 'Another Site generated as mock data',
          image: '/images/2.png',
        }
      ]
    }))
  } catch (error) {
    yield put(loadSitesFail(error.response ? error.response.data : {}))
  }
}

const doLoadSiteOrGetFromCache = function* (action) {
  const { id } = action.payload
  const loadedSites = yield select(selectSites)
  const site = loadedSites.find(_site => _site.id === id)
  if (site) {
    yield put(setCurrentSite(site))
  } else {
    yield put(loadSite({ id }))
  }
}

const doLoadSite = function* (action) {
  const { id } = action.payload
  
  try {
    // const response = yield call(
    //   axios.get,
    //   `${API_BASE_URL}/mdm/site/detail/${id}`,
    // )
    // yield put(loadSiteSuccess(response.data))
    yield put(loadSiteSuccess({
      id: 1,
      name: 'First Site',
      description: 'Site generated as mock data for testing',
      image: '/images/1.jpg',
    }))
  } catch (error) {
    yield put(loadSiteFail(error.response ? error.response.data : {}))
  }
}

export const saga = function* () {
  yield takeLatest(LOAD_SITES, doLoadSites)
  yield takeLatest(LOAD_SITE_OR_GET_FROM_CACHE, doLoadSiteOrGetFromCache)
  yield takeLatest(LOAD_SITE, doLoadSite)
}
