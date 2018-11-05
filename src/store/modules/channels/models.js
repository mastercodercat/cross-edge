import Immutable from 'immutable'

import { PaginatedListData, createDetailDataType } from 'store/common/models'


export const Channel = Immutable.Record({
  id: 0,
  name: '',
  description: '',
  gln: '',
  url: '',
  address_1: '',
  address_2: '',
  city: '',
  state: '',
  country: '',
  postal_code: '',
  time_zone_offset: 0
})

export const ChannelEntrySubRecord = Immutable.Record({
  id: 0,
  name: '',
})

export const ChannelEntry = Immutable.Record({
  channel: ChannelEntrySubRecord(),
  product: ChannelEntrySubRecord(),
  serial_number: '',
  ship_date: '',
})

export const ChannelData = createDetailDataType(Channel())

export const State = Immutable.Record({
  channels: PaginatedListData(),

  currentChannel: ChannelData(),

  currentChannelEntries: PaginatedListData(),
})
