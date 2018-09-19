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
  } = config

  if (!action || !dataField || !successPayloadProcessor) {
    throw new Error('action, dataField and successPayloadProcessor should be set for generating request loop handlers')
  }

  if (!stateField) {
    stateField = dataField + 'State'
  }

  initialValue = initialValue || null

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
  }
}
