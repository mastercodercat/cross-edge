import Immutable from 'immutable'

import { REQUEST_INITIAL } from 'constants.js'
import { DEFAULT_PAGE_SIZE } from 'config/base'


export const ListData = Immutable.Record({
  data: Immutable.List(),
  state: REQUEST_INITIAL,
})

export const PaginatedListData = Immutable.Record({
  data: Immutable.List(),
  state: REQUEST_INITIAL,
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  count: 0,
})

export const createDetailDataType = (detailDataInitialValue) => Immutable.Record({
  data: detailDataInitialValue,
  state: REQUEST_INITIAL,
})
