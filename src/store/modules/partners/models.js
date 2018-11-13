import Immutable from 'immutable'

import { PaginatedListData, createDetailDataType } from 'store/common/models'


export const Partner = Immutable.Record({
  id: 0,
  name: '',
  image: '',
  address_1: '',
  address_2: '',
  city: '',
  country: '',
  gln: '',
  has_sites: false,
  has_sub_sites: false,
  has_business_processes: false,
  postal_code: '',
  state: '',
  time_zone_offset: '',
  mdm_type: '',
})

export const PartnerData = createDetailDataType(Partner())

export const State = Immutable.Record({
  partners: PaginatedListData(),
  currentPartner: PartnerData(),
})
