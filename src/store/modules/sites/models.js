import Immutable from 'immutable'

import { PaginatedListData } from 'store/common/models'


export const Site = Immutable.Record({
  id: 0,
  name: '',
  description: '',
  image: '',
})

export const State = Immutable.Record({
  sites: PaginatedListData(),
})
