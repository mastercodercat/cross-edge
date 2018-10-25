import Immutable from 'immutable'

import { PaginatedListData, createDetailDataType } from 'store/common/models'


export const Subscriber = Immutable.Record({
  description: '',
  gln: '',
  has_business_processes: false,
  id: 0,
  image: '',
  mdm_type: '',
  name: '',
  time_zone_offset: 0,
})

export const SubscriberData = createDetailDataType(Subscriber())

export const State = Immutable.Record({
  homeContent: PaginatedListData(),

  currentSubscriber: SubscriberData(),
})
