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

export const ChannelList = Immutable.List

export const InitialState = Immutable.Record({
  channels: ChannelList(),
  channelsState: REQUEST_INITIAL,

  currentChannel: Channel(),
  currentChannelState: REQUEST_INITIAL,
})
