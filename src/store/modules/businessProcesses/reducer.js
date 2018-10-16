import Immutable from 'immutable'
import { createAction, handleActions } from 'redux-actions'

import { convertToListRecord } from 'utils/state-helpers'

import {
  generateRequestLoopHandlers,
  successAction, failAction, setPageAction, setPageSizeAction,
} from 'utils/state-helpers'
import { PaginatedListData } from 'store/common/models'
// import { REQUEST_SUCCESS } from 'constants.js'

import {
  LOAD_BUSINESS_PROCESSES,
  LOAD_BUSINESS_PROCESS,
} from './constants'

import {
  State,
  BusinessProcess,
  BusinessProcessData,
} from './models'


/* Initial state */

const initialState = new State({
  businessProcesses: PaginatedListData(),

  currentBusinessProcess: BusinessProcessData(),
})

/* Action creators */

export const loadBusinessProcesses = createAction(LOAD_BUSINESS_PROCESSES)
export const loadBusinessProcessesSuccess = createAction(successAction(LOAD_BUSINESS_PROCESSES))
export const loadBusinessProcessesFail = createAction(failAction(LOAD_BUSINESS_PROCESSES))
export const setBusinessProcessesPage = createAction(setPageAction(LOAD_BUSINESS_PROCESSES))
export const setBusinessProcessesPageSize = createAction(setPageSizeAction(LOAD_BUSINESS_PROCESSES))

export const loadBusinessProcess = createAction(LOAD_BUSINESS_PROCESS)
export const loadBusinessProcessSuccess = createAction(successAction(LOAD_BUSINESS_PROCESS))
export const loadBusinessProcessFail = createAction(failAction(LOAD_BUSINESS_PROCESS))

/* Reducer */

export const reducer = handleActions({

  /* Load business processes */

  ...generateRequestLoopHandlers({
    action: LOAD_BUSINESS_PROCESSES,
    dataField: 'businessProcesses',
    initialValue: Immutable.List(),
    getDataFromPayload: payload => convertToListRecord(payload, BusinessProcess),
    usePagination: false,
  }),

  /* Load business process */

  ...generateRequestLoopHandlers({
    action: LOAD_BUSINESS_PROCESS,
    dataField: 'currentBusinessProcess',
    getDataFromPayload: payload => BusinessProcess(payload),
  }),

}, initialState)
