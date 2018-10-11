import Immutable from 'immutable'

import { PaginatedListData, createDetailDataType } from 'store/common/models'


export const Site = Immutable.Record({
  id: 0,
  name: '',
  description: '',
  image: '',
})

export const SiteData = createDetailDataType(Site())

export const State = Immutable.Record({
  sites: PaginatedListData(),

  currentSite: SiteData(),
})
