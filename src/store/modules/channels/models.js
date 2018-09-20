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

export const ChannelEntry = Immutable.Record({
  channel: 0,
  product: 0,
  serial_number: '',
  ship_date: '',
})

export const ChannelData = createDetailDataType(Channel())

export const InitialState = Immutable.Record({
  channels: PaginatedListData(),

  currentChannel: ChannelData(),

  currentChannelEntriesChannel: Channel(),
  currentChannelEntries: PaginatedListData(),
})
