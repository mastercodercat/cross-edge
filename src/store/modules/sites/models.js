import Immutable from 'immutable'

import { PaginatedListData, createDetailDataType } from 'store/common/models'


export const Site = Immutable.Record({
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
  has_sub_sites: false,
  has_business_processes: false,
  mdm_type: '',
})

export const SiteData = createDetailDataType(Site())

export const State = Immutable.Record({
  sites: PaginatedListData(),
  currentSite: SiteData(),
  subsites: PaginatedListData(),
  currentSubsite: SiteData(),
})
