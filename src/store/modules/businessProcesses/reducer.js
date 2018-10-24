import Immutable from 'immutable'
import { createAction, handleActions } from 'redux-actions'

import { convertToListRecord } from 'utils/state-helpers'
import { REQUEST_SUCCESS } from 'constants.js'

import {
  requestLoopHandlersForGet,
  requestLoopHandlersForUpdate,
  successAction, failAction,
} from 'utils/state-helpers'
import { PaginatedListData } from 'store/common/models'

import {
  LOAD_BUSINESS_PROCESSES,
  LOAD_BUSINESS_PROCESS,
  SUBMIT_DATA,
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

  submitDataState: REQUEST_SUCCESS,
})

/* Action creators */

export const loadBusinessProcesses = createAction(LOAD_BUSINESS_PROCESSES)
export const loadBusinessProcessesSuccess = createAction(successAction(LOAD_BUSINESS_PROCESSES))
export const loadBusinessProcessesFail = createAction(failAction(LOAD_BUSINESS_PROCESSES))

export const loadBusinessProcess = createAction(LOAD_BUSINESS_PROCESS)
export const loadBusinessProcessSuccess = createAction(successAction(LOAD_BUSINESS_PROCESS))
export const loadBusinessProcessFail = createAction(failAction(LOAD_BUSINESS_PROCESS))

export const submitData = createAction(SUBMIT_DATA)
export const submitDataSuccess = createAction(successAction(SUBMIT_DATA))
export const submitDataFail = createAction(failAction(SUBMIT_DATA))

/* Reducer */

export const reducer = handleActions({

  /* Load business processes */

  ...requestLoopHandlersForGet({
    action: LOAD_BUSINESS_PROCESSES,
    dataField: 'businessProcesses',
    initialValue: Immutable.List(),
    getDataFromPayload: payload => convertToListRecord(payload, BusinessProcess),
    usePagination: false,
  }),

  /* Load business process */

  ...requestLoopHandlersForGet({
    action: LOAD_BUSINESS_PROCESS,
    dataField: 'currentBusinessProcess',
    getDataFromPayload: payload => BusinessProcess(payload),
  }),

  /* Submit data */

  ...requestLoopHandlersForUpdate({
    action: SUBMIT_DATA,
    stateField: 'submitDataState'
  }),

}, initialState)
