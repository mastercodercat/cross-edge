import Immutable from 'immutable'
import { createAction, handleActions } from 'redux-actions'

import { REQUEST_SUCCESS } from 'constants.js'
import { convertToListRecord } from 'utils/state-helpers'
import {
  generateRequestLoopHandlers,
  successAction, failAction,
} from 'utils/state-helpers'
import { PaginatedListData } from 'store/common/models'
import {
  LOAD_PARTNERS,
  LOAD_PARTNER_OR_GET_FROM_CACHE,
  LOAD_PARTNER,
  SET_CURRENT_PARTNER,
} from './constants'
import {
  State,
  Partner,
  PartnerData,
} from './models'


/* Initial state */

const initialState = new State({
  partners: PaginatedListData(),
  currentPartner: PartnerData(),
})

/* Action creators */

export const loadPartners = createAction(LOAD_PARTNERS)
export const loadPartnersSuccess = createAction(successAction(LOAD_PARTNERS))
export const loadPartnersFail = createAction(failAction(LOAD_PARTNERS))

export const loadPartnerOrGetFromCache = createAction(LOAD_PARTNER_OR_GET_FROM_CACHE)
export const loadPartner = createAction(LOAD_PARTNER)
export const loadPartnerSuccess = createAction(successAction(LOAD_PARTNER))
export const loadPartnerFail = createAction(failAction(LOAD_PARTNER))
export const setCurrentPartner = createAction(SET_CURRENT_PARTNER)

/* Reducer */

export const reducer = handleActions({

  /* Load partners */

  ...generateRequestLoopHandlers({
    action: LOAD_PARTNERS,
    dataField: 'partners',
    initialValue: Immutable.List(),
    getDataFromPayload: payload => convertToListRecord(payload, Partner),
    usePagination: false,
  }),

  /* Load partner */

  ...generateRequestLoopHandlers({
    action: LOAD_PARTNER,
    dataField: 'currentPartner',
    getDataFromPayload: payload => Partner(payload),
  }),

  [SET_CURRENT_PARTNER]: (state, { payload }) => state.withMutations(record => {
    record.setIn(['currentPartner', 'data'], Partner(payload))
    record.setIn(['currentPartner', 'state'], REQUEST_SUCCESS)
  }),

}, initialState)
