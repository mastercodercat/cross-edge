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
})

export const SiteData = createDetailDataType(Site())

export const State = Immutable.Record({
  sites: PaginatedListData(),

  currentSite: SiteData(),
  siteSubsites: PaginatedListData(),
})
