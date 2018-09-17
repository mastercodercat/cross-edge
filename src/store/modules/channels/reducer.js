import { createAction, handleActions } from 'redux-actions'

import { convertToListRecord } from 'utils/state-helpers'

import {
  REQUEST_INITIAL,
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_FAIL,
} from 'constants.js'

import {
  LOAD_CHANNELS,
  LOAD_CHANNELS_SUCCESS,
  LOAD_CHANNELS_FAIL,
  LOAD_CHANNEL,
  LOAD_CHANNEL_SUCCESS,
  LOAD_CHANNEL_FAIL,
  LOAD_CHANNEL_ENTRIES,
  LOAD_CHANNEL_ENTRIES_SUCCESS,
  LOAD_CHANNEL_ENTRIES_FAIL,
} from './constants'

import {
  InitialState,
  Channel,
  ChannelList
} from './models'


/* Initial state */

const initialState = new InitialState({
  channels: ChannelList(),
  channelsState: REQUEST_INITIAL,

  currentChannel: Channel(),
  currentChannelState: REQUEST_INITIAL,
})

/* Action creators */

export const loadChannels = createAction(LOAD_CHANNELS)
export const loadChannelsSuccess = createAction(LOAD_CHANNELS_SUCCESS)
export const loadChannelsFail = createAction(LOAD_CHANNELS_FAIL)

export const loadChannel = createAction(LOAD_CHANNEL)
export const loadChannelSuccess = createAction(LOAD_CHANNEL_SUCCESS)
export const loadChannelFail = createAction(LOAD_CHANNEL_FAIL)

/* Reducer */

export const reducer = handleActions({

  /* Load channels */

  [LOAD_CHANNELS]: (state) => state.withMutations(record => {
    record.set('channels', ChannelList())
    record.set('channelsState', REQUEST_PENDING)
  }),

  [LOAD_CHANNELS_SUCCESS]: (state, { payload }) => state.withMutations(record => {
    record.set('channels', convertToListRecord(payload.results, ChannelList, Channel))
    record.set('channelsState', REQUEST_SUCCESS)
  }),

  [LOAD_CHANNELS_FAIL]: (state) => state.withMutations(record => {
    record.set('channels', ChannelList())
    record.set('channelsState', REQUEST_FAIL)
  }),

  /* Load single channel detail by id */

  [LOAD_CHANNEL]: (state) => state.withMutations(record => {
    record.set('currentChannel', null)
    record.set('currentChannelState', REQUEST_PENDING)
  }),

  [LOAD_CHANNEL_SUCCESS]: (state, { payload }) => state.withMutations(record => {
    record.set('currentChannel', Channel(payload))
    record.set('currentChannelState', REQUEST_SUCCESS)
  }),

  [LOAD_CHANNEL_FAIL]: (state) => state.withMutations(record => {
    record.set('currentChannel', null)
    record.set('currentChannelState', REQUEST_FAIL)
  }),

}, initialState)
