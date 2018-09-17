import Immutable from 'immutable'
import {
  REQUEST_INITIAL,
  REQUEST_PENDING,
} from 'constants.js'


export function isLoading(requestState) {
  return requestState === REQUEST_INITIAL || requestState === REQUEST_PENDING
}

export function convertToListRecord(data, SingleModel) {
  return Immutable.List(
    (data || []).map(record => SingleModel(record))
  )
}
