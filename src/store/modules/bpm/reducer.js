import Immutable from 'immutable'
import { createAction, handleActions } from 'redux-actions'

import {
  generateRequestLoopHandlers,
  successAction, failAction,
} from 'utils/state-helpers'
import { PaginatedListData } from 'store/common/models'
import { Partner } from 'store/modules/partners'
import { Site } from 'store/modules/sites'
import { BusinessProcess } from 'store/modules/businessProcesses'

import {
  LOAD_HOME,
} from './constants'

import {
  Subscriber,
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
})

/* Action creators */

export const loadHome = createAction(LOAD_HOME)
export const loadHomeSuccess = createAction(successAction(LOAD_HOME))
export const loadHomeFail = createAction(failAction(LOAD_HOME))

/* Reducer */

export const reducer = handleActions({

  /* Load business processes */

  ...generateRequestLoopHandlers({
    action: LOAD_HOME,
    dataField: 'homeContent',
    initialValue: Immutable.List(),
    getDataFromPayload: payload => Immutable.List(payload.map(record =>
      mdmTypeToRecord[record.mdm_type](record)
    )),
    usePagination: false,
  }),

}, initialState)
