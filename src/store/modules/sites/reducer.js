import Immutable from 'immutable'
import { createAction, handleActions } from 'redux-actions'

import { convertToListRecord } from 'utils/state-helpers'

import {
  generateRequestLoopHandlers,
  successAction, failAction, setPageAction, setPageSizeAction,
} from 'utils/state-helpers'
import { PaginatedListData } from 'store/common/models'

import {
  LOAD_SITES,
} from './constants'

import {
  State,
  Site,
} from './models'


/* Initial state */

const initialState = new State({
  sites: PaginatedListData(),
})

/* Action creators */

export const loadSites = createAction(LOAD_SITES)
export const loadSitesSuccess = createAction(successAction(LOAD_SITES))
export const loadSitesFail = createAction(failAction(LOAD_SITES))
export const setSitesPage = createAction(setPageAction(LOAD_SITES))
export const setSitesPageSize = createAction(setPageSizeAction(LOAD_SITES))

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

}, initialState)
