import Immutable from 'immutable'
import {
  REQUEST_INITIAL,
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_FAIL,
} from 'constants.js'


export function isLoading(requestState) {
  return requestState === REQUEST_INITIAL || requestState === REQUEST_PENDING
}

export function needsLoading(requestState) {
  return requestState === REQUEST_INITIAL || requestState === REQUEST_FAIL
}

export function convertToListRecord(data, SingleModel) {
  return Immutable.List(
    (data || []).map(record => SingleModel(record))
  )
}

export function generateRequestLoopHandlers(config) {
  /*
   * This function will be used for registering async request loop handlers such as API.
   * It'll handle initial, success and fail cases.
   * In config, action, dataField and getDataFromPayload are required, and
   * getDataFromPayload should be function in the form of (payload) => (do something and return new_dataField_value)
   */
  let {
    action, dataField, initialValue, getDataFromPayload,
    onInitial, onSuccess, onFail,
    usePagination, setPageAction, setPageSizeAction,
  } = config

  if (!action || !dataField || !getDataFromPayload) {
    throw new Error('action, dataField and getDataFromPayload should be set for generating request loop handlers')
  }

  initialValue = initialValue || null

  let paginationHandlers = {}
  if (usePagination) {
    setPageAction = setPageAction || (`${action}/set_page`)
    setPageSizeAction = setPageSizeAction || (`${action}/set_page_size`)

    paginationHandlers = {
      [setPageAction]: (state, { payload }) => state.withMutations(record =>
        record.setIn([dataField, 'page'], payload)),

      [setPageSizeAction]: (state, { payload }) => state.withMutations(record =>
        record.setIn([dataField, 'pageSize'], payload)),
    }
  }

  return {
    [action]: (state, { payload }) => state.withMutations(record => {
      record.setIn([dataField, 'data'], initialValue)
      record.setIn([dataField, 'state'], REQUEST_PENDING)
      if (onInitial) {
        onInitial(record, payload)
      }
    }),

    [`${action}/success`]: (state, { payload }) => state.withMutations(record => {
      record.setIn([dataField, 'data'], getDataFromPayload(payload))
      record.setIn([dataField, 'state'], REQUEST_SUCCESS)
      if (usePagination) {
        record.setIn([dataField, 'count'], payload.count)
      }
      if (onSuccess) {
        onSuccess(record, payload)
      }
    }),

    [`${action}/fail`]: (state, { payload }) => state.withMutations(record => {
      record.setIn([dataField, 'state'], initialValue)
      record.setIn([dataField, 'state'], REQUEST_FAIL)
      if (onFail) {
        onFail(record, payload)
      }
    }),

    ...paginationHandlers,

  }
}
