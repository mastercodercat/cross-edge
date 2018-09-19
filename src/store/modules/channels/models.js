import Immutable from 'immutable'

import { REQUEST_INITIAL } from 'constants.js'
import { DEFAULT_PAGE_SIZE } from 'config/base'


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

export const InitialState = Immutable.Record({
  channels: Immutable.List(),
  channelsState: REQUEST_INITIAL,
  channelsPage: 1,
  channelsPageSize: DEFAULT_PAGE_SIZE,
  channelsCount: 0,

  currentChannel: Channel(),
  currentChannelState: REQUEST_INITIAL,

  currentChannelEntriesChannelId: 0,
  currentChannelEntries: Immutable.List(),
  currentChannelEntriesState: REQUEST_INITIAL,
  currentChannelEntriesPage: 1,
  currentChannelEntriesPageSize: DEFAULT_PAGE_SIZE,
  currentChannelEntriesCount: 0,
})
