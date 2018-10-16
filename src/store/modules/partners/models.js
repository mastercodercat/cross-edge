import Immutable from 'immutable'

import { PaginatedListData, createDetailDataType } from 'store/common/models'


export const Partner = Immutable.Record({
  id: 0,
  name: '',
})

export const PartnerData = createDetailDataType(Partner())

export const State = Immutable.Record({
  partners: PaginatedListData(),
  // currentPartner: PartnerData(),
})
