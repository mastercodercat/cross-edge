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
  LOAD_SITE,
  SET_CURRENT_SITE,
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
})

/* Action creators */

export const loadSites = createAction(LOAD_SITES)
export const loadSitesSuccess = createAction(successAction(LOAD_SITES))
export const loadSitesFail = createAction(failAction(LOAD_SITES))
export const setSitesPage = createAction(setPageAction(LOAD_SITES))
export const setSitesPageSize = createAction(setPageSizeAction(LOAD_SITES))

export const loadSite = createAction(LOAD_SITE)
export const loadSiteSuccess = createAction(successAction(LOAD_SITE))
export const loadSiteFail = createAction(failAction(LOAD_SITE))

export const setCurrentSite = createAction(SET_CURRENT_SITE)

/* Reducer */

export const reducer = handleActions({

  /* Load sites */

  ...generateRequestLoopHandlers({
    action: LOAD_SITES,
    dataField: 'sites',
    initialValue: Immutable.List(),
    getDataFromPayload: payload => convertToListRecord(payload.results, Site),
    usePagination: true,
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

}, initialState)
