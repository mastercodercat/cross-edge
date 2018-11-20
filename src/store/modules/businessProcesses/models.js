import Immutable from 'immutable'

import { REQUEST_SUCCESS } from 'constants.js'
import { PaginatedListData, createDetailDataType } from 'store/common/models'


export const BusinessProcess = Immutable.Record({
  id: 0,
  name: '',
  description: '',
  image: '',
  address_1: '',
  address_2: '',
  city: '',
  country: '',
  gln: '',
  postal_code: '',
  state: '',
  time_zone_offset: 0,
  mdm_type: '',
  steps: [],
})

export const BusinessProcessData = createDetailDataType(BusinessProcess())

export const State = Immutable.Record({
  businessProcesses: PaginatedListData(),
  currentBusinessProcess: BusinessProcessData(),
  submitDataState: REQUEST_SUCCESS,
})
