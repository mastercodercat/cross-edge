import Immutable from 'immutable'

import { REQUEST_INITIAL } from 'constants.js'


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
  name: '',
  description: '',
  upc: '',
  gtin: '',
  sku: '',
  internal_identifier: '',
  primary_identifier: 0,
  image: '',
})

export const InitialState = Immutable.Record({
  channels: Immutable.List(),
  channelsState: REQUEST_INITIAL,

  currentChannel: Channel(),
  currentChannelState: REQUEST_INITIAL,
  currentChannelEntries: Immutable.List(),
  currentChannelEntriesState: REQUEST_INITIAL,
})
