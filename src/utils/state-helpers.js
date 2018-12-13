import Immutable from 'immutable'
import {
  REQUEST_INITIAL,
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_FAIL,
} from 'constants.js'


export function isLoading(requestState, strict = false) {
  if (strict) {
    return requestState === REQUEST_PENDING
  }
  return requestState === REQUEST_INITIAL || requestState === REQUEST_PENDING
}

export function needsLoading(requestState) {
  return requestState === REQUEST_INITIAL || requestState === REQUEST_FAIL
}

export function isPending(requestState) {
  return requestState === REQUEST_PENDING
}

export function hasSucceeded(requestState) {
  return requestState === REQUEST_SUCCESS
}

export function hasFailed(requestState) {
  return requestState === REQUEST_FAIL
}

export function convertToListRecord(data, SingleModelOrRecordCreator) {
  return Immutable.List(
    (data || []).map(record => SingleModelOrRecordCreator(record))
  )
}

export function successAction(action) {
  return `${action}/success`
}

export function failAction(action) {
  return `${action}/fail`
}

export function setPageAction(action) {
  return `${action}/set_page`
}

export function setPageSizeAction(action) {
  return `${action}/set_page_size`
}

export function requestLoopHandlersForGet(config) {
  /*
   * This function will be used for registering async request loop handlers such as GET API call.
   * It'll handle initial, success and fail cases.
   * In config, action, dataField and getDataFromPayload are required, and
   * getDataFromPayload should be function in the form of (payload) => (do something and return new_dataField_value)
   */
  let {
    action, dataField, initialValue, getDataFromPayload,
    onInitial, onSuccess, onFail,
    usePagination, setPageAction: _setPageAction, setPageSizeAction: _setPageSizeAction,
    preservePreviousState,
  } = config

  if (!action || !dataField || !getDataFromPayload) {
    throw new Error('action, dataField and getDataFromPayload should be set for generating get request loop handlers')
  }

  initialValue = (typeof initialValue === 'undefined') ? null : initialValue

  let paginationHandlers = {}
  if (usePagination) {
    _setPageAction = _setPageAction || setPageAction(action)
    _setPageSizeAction = _setPageSizeAction || setPageSizeAction(action)

    paginationHandlers = {
      [_setPageAction]: (state, { payload }) => state.withMutations(record =>
        record.setIn([dataField, 'page'], payload)),

      [_setPageSizeAction]: (state, { payload }) => state.withMutations(record =>
        record.setIn([dataField, 'pageSize'], payload)),
    }
  }

  return {
    [action]: (state, { payload }) => state.withMutations(record => {
      if (!preservePreviousState) {
        record.setIn([dataField, 'data'], initialValue)
      }
      record.setIn([dataField, 'state'], REQUEST_PENDING)
      if (payload && payload.id) {
        record.setIn([dataField, 'id'], payload.id)
      }
      if (onInitial) {
        onInitial(record, payload)
      }
    }),

    [successAction(action)]: (state, { payload }) => state.withMutations(record => {
      record.setIn([dataField, 'data'], getDataFromPayload(payload))
      record.setIn([dataField, 'state'], REQUEST_SUCCESS)
      if (usePagination) {
        record.setIn([dataField, 'count'], payload.count)
      }
      if (onSuccess) {
        onSuccess(record, payload)
      }
    }),

    [failAction(action)]: (state, { payload }) => state.withMutations(record => {
      record.setIn([dataField, 'data'], initialValue)
      record.setIn([dataField, 'state'], REQUEST_FAIL)
      if (onFail) {
        onFail(record, payload)
      }
    }),

    ...paginationHandlers,

  }
}

export function requestLoopHandlersForUpdate(config) {
  /*
   * This function will be used for registering async request loop handlers for update request
   * such as POST, PUT and DELETE RESTful API calls.
   * It'll handle initial, success and fail cases.
   * In config, action, dataField and getDataFromPayload are required, and
   * getDataFromPayload should be function in the form of (payload) => (do something and return new_dataField_value)
   */
  let {
    action, stateField,
    onInitial, onSuccess, onFail,
  } = config

  if (!action || !stateField) {
    throw new Error('action and stateField should be set for generating update request loop handlers')
  }

  return {
    [action]: (state, { payload }) => state.withMutations(record => {
      record.set(stateField, REQUEST_PENDING)
      if (onInitial) {
        onInitial(record, payload)
      }
    }),

    [successAction(action)]: (state, { payload }) => state.withMutations(record => {
      record.set(stateField, REQUEST_SUCCESS)
      if (onSuccess) {
        onSuccess(record, payload)
      }
    }),

    [failAction(action)]: (state, { payload }) => state.withMutations(record => {
      record.set(stateField, REQUEST_FAIL)
      if (onFail) {
        onFail(record, payload)
      }
    }),
  }
}
