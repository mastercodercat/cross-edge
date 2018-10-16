import Immutable from 'immutable'
import { createAction, handleActions } from 'redux-actions'

import { convertToListRecord } from 'utils/state-helpers'

import {
  generateRequestLoopHandlers,
  successAction, failAction, setPageAction, setPageSizeAction,
} from 'utils/state-helpers'
import { PaginatedListData } from 'store/common/models'
import { REQUEST_SUCCESS } from 'constants.js'

import {
  LOAD_SITES,
  LOAD_SITE_OR_GET_FROM_CACHE,
  LOAD_SITE,
  SET_CURRENT_SITE,
  LOAD_SITE_SUBSITES,
  LOAD_SUBSITE_OR_GET_FROM_CACHE,
  LOAD_SUBSITE,
  SET_CURRENT_SUBSITE,
} from './constants'

import {
  State,
  Site,
  SiteData,
} from './models'


/* Initial state */

const initialState = new State({
  sites: PaginatedListData(),
  currentSite: SiteData(),
  siteSubsites: PaginatedListData(),
  currentSubsite: SiteData(),
})

/* Action creators */

export const loadSites = createAction(LOAD_SITES)
export const loadSitesSuccess = createAction(successAction(LOAD_SITES))
export const loadSitesFail = createAction(failAction(LOAD_SITES))
export const setSitesPage = createAction(setPageAction(LOAD_SITES))
export const setSitesPageSize = createAction(setPageSizeAction(LOAD_SITES))

export const loadSiteOrGetFromCache = createAction(LOAD_SITE_OR_GET_FROM_CACHE)
export const loadSite = createAction(LOAD_SITE)
export const loadSiteSuccess = createAction(successAction(LOAD_SITE))
export const loadSiteFail = createAction(failAction(LOAD_SITE))
export const setCurrentSite = createAction(SET_CURRENT_SITE)

export const loadSiteSubsites = createAction(LOAD_SITE_SUBSITES)
export const loadSiteSubsitesSuccess = createAction(successAction(LOAD_SITE_SUBSITES))
export const loadSiteSubsitesFail = createAction(failAction(LOAD_SITE_SUBSITES))
export const setSiteSubsitesPage = createAction(setPageAction(LOAD_SITE_SUBSITES))
export const setSiteSubsitesPageSize = createAction(setPageSizeAction(LOAD_SITE_SUBSITES))

export const loadSubsiteOrGetFromCache = createAction(LOAD_SUBSITE_OR_GET_FROM_CACHE)
export const loadSubsite = createAction(LOAD_SUBSITE)
export const loadSubsiteSuccess = createAction(successAction(LOAD_SUBSITE))
export const loadSubsiteFail = createAction(failAction(LOAD_SUBSITE))
export const setCurrentSubsite = createAction(SET_CURRENT_SUBSITE)

/* Reducer */

export const reducer = handleActions({

  /* Load sites */

  ...generateRequestLoopHandlers({
    action: LOAD_SITES,
    dataField: 'sites',
    initialValue: Immutable.List(),
    getDataFromPayload: payload => convertToListRecord(payload, Site),
    usePagination: false,
  }),

  /* Load site */

  ...generateRequestLoopHandlers({
    action: LOAD_SITE,
    dataField: 'currentSite',
    getDataFromPayload: payload => Site(payload),
  }),

  [SET_CURRENT_SITE]: (state, { payload }) => state.withMutations(record => {
    record.setIn(['currentSite', 'data'], Site(payload))
    record.setIn(['currentSite', 'state'], REQUEST_SUCCESS)
  }),

  /* Load site subsites */

  ...generateRequestLoopHandlers({
    action: LOAD_SITE_SUBSITES,
    dataField: 'siteSubsites',
    initialValue: Immutable.List(),
    getDataFromPayload: payload => convertToListRecord(payload, Site),
    usePagination: false,
  }),

  /* Load subsite */

  ...generateRequestLoopHandlers({
    action: LOAD_SUBSITE,
    dataField: 'currentSubsite',
    getDataFromPayload: payload => Site(payload),
  }),

  [SET_CURRENT_SUBSITE]: (state, { payload }) => state.withMutations(record => {
    record.setIn(['currentSubsite', 'data'], Site(payload))
    record.setIn(['currentSubsite', 'state'], REQUEST_SUCCESS)
  }),

}, initialState)
