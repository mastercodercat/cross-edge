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

export function convertToListRecord(data, SingleModel) {
  return Immutable.List(
    (data || []).map(record => SingleModel(record))
  )
}

export function generateRequestLoopHandlers(config) {
  /*
   * This function will be used for registering async request loop handlers such as API. It'll handle
   * initial, success and fail cases.
   * In config, action, dataField and successPayloadProcessor are required, and successPayloadProcessor should be function in the
   * form of function(payload) { ... return [new_dataField_value]}
   */
  let {
    action, dataField, stateField,
    initialValue, successPayloadProcessor,
    onInitial, onSuccess, onFail,
    usePagination, pageField, page_sizeField, countField, setPageAction, setPageSizeAction,
  } = config

  if (!action || !dataField || !successPayloadProcessor) {
    throw new Error('action, dataField and successPayloadProcessor should be set for generating request loop handlers')
  }

  stateField = stateField || (`${dataField}State`)
  initialValue = initialValue || null

  let paginationHandlers = {}
  if (usePagination) {
    pageField = pageField || (`${dataField}Page`)
    page_sizeField = page_sizeField || (`${dataField}PageSize`)
    countField = countField || (`${dataField}Count`)
    setPageAction = setPageAction || (`${action}/set_page`)
    setPageSizeAction = setPageSizeAction || (`${action}/set_page_size`)

    paginationHandlers = {
      [setPageAction]: (state, { payload }) => state.withMutations(record =>
        record.set(pageField, payload)),

      [setPageSizeAction]: (state, { payload }) => state.withMutations(record =>
        record.set(page_sizeField, payload)),
    }
  }

  return {
    [action]: (state, { payload }) => state.withMutations(record => {
      record.set(dataField, initialValue)
      record.set(stateField, REQUEST_PENDING)
      if (onInitial) {
        onInitial(record, payload)
      }
    }),

    [`${action}/success`]: (state, { payload }) => state.withMutations(record => {
      record.set(dataField, successPayloadProcessor(payload))
      record.set(stateField, REQUEST_SUCCESS)
      if (usePagination) {
        record.set(countField, payload.count)
      }
      if (onSuccess) {
        onSuccess(record, payload)
      }
    }),

    [`${action}/fail`]: (state, { payload }) => state.withMutations(record => {
      record.set(dataField, initialValue)
      record.set(stateField, REQUEST_FAIL)
      if (onFail) {
        onFail(record, payload)
      }
    }),

    ...paginationHandlers,

  }
}
