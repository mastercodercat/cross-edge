import Immutable from 'immutable'
import { createAction, handleActions } from 'redux-actions'

import { convertToListRecord } from 'utils/state-helpers'

import {
  generateRequestLoopHandlers,
  successAction, failAction,
} from 'utils/state-helpers'
import { PaginatedListData } from 'store/common/models'

import {
  LOAD_PARTNERS,
} from './constants'

import {
  State,
  Partner,
  // PartnerData,
} from './models'


/* Initial state */

const initialState = new State({
  partners: PaginatedListData(),
})

/* Action creators */

export const loadPartners = createAction(LOAD_PARTNERS)
export const loadPartnersSuccess = createAction(successAction(LOAD_PARTNERS))
export const loadPartnersFail = createAction(failAction(LOAD_PARTNERS))

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

}, initialState)
