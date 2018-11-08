import Immutable from 'immutable'
import { createAction, handleActions } from 'redux-actions'

import {
  requestLoopHandlersForGet,
  successAction, failAction,
} from 'utils/state-helpers'
import { PaginatedListData } from 'store/common/models'
import { Partner } from 'store/modules/partners'
import { Site } from 'store/modules/sites'
import { BusinessProcess } from 'store/modules/businessProcesses'
import { REQUEST_SUCCESS } from 'constants.js'

import {
  LOAD_HOME,
  LOAD_SUBSCRIBER_OR_GET_FROM_CACHE,
  LOAD_SUBSCRIBER,
  SET_CURRENT_SUBSCRIBER,
} from './constants'

import {
  Subscriber,
  SubscriberData,
  State,
} from './models'


const mdmTypeToRecord = {
  subscriber: Subscriber,
  partner: Partner,
  site: Site,
  subsite: Site,
  'business-process': BusinessProcess,
}

/* Initial state */

const initialState = new State({
  home: PaginatedListData(),
  currentSubscriber: SubscriberData(),
})

/* Action creators */

export const loadHome = createAction(LOAD_HOME)
export const loadHomeSuccess = createAction(successAction(LOAD_HOME))
export const loadHomeFail = createAction(failAction(LOAD_HOME))

export const loadSubscriberOrGetFromCache = createAction(LOAD_SUBSCRIBER_OR_GET_FROM_CACHE)
export const loadSubscriber = createAction(LOAD_SUBSCRIBER)
export const loadSubscriberSuccess = createAction(successAction(LOAD_SUBSCRIBER))
export const loadSubscriberFail = createAction(failAction(LOAD_SUBSCRIBER))
export const setCurrentSubscriber = createAction(SET_CURRENT_SUBSCRIBER)

/* Reducer */

export const reducer = handleActions({

  /* Load business processes */

  ...requestLoopHandlersForGet({
    action: LOAD_HOME,
    dataField: 'homeContent',
    initialValue: Immutable.List(),
    getDataFromPayload: payload => Immutable.List(payload.map(record =>
      mdmTypeToRecord[record.mdm_type](record)
    )),
    usePagination: false,
  }),

  /* Load subscriber */

  ...requestLoopHandlersForGet({
    action: LOAD_SUBSCRIBER,
    dataField: 'currentSubscriber',
    getDataFromPayload: payload => Subscriber(payload),
  }),

  [SET_CURRENT_SUBSCRIBER]: (state, { payload }) => state.withMutations(record => {
    record.setIn(['currentSubscriber', 'data'], Subscriber(payload))
    record.setIn(['currentSubscriber', 'state'], REQUEST_SUCCESS)
  }),

}, initialState)
