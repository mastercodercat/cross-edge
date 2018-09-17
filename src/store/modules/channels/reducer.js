import Immutable from 'immutable'
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
  ChannelEntry,
} from './models'


/* Initial state */

const initialState = new InitialState({
  channels: Immutable.List(),
  channelsState: REQUEST_INITIAL,

  currentChannel: Channel(),
  currentChannelState: REQUEST_INITIAL,
  currentChannelEntries: Immutable.List(),
  currentChannelEntriesState: REQUEST_INITIAL,
})

/* Action creators */

export const loadChannels = createAction(LOAD_CHANNELS)
export const loadChannelsSuccess = createAction(LOAD_CHANNELS_SUCCESS)
export const loadChannelsFail = createAction(LOAD_CHANNELS_FAIL)

export const loadChannel = createAction(LOAD_CHANNEL)
export const loadChannelSuccess = createAction(LOAD_CHANNEL_SUCCESS)
export const loadChannelFail = createAction(LOAD_CHANNEL_FAIL)

export const loadChannelEntries = createAction(LOAD_CHANNEL_ENTRIES)
export const loadChannelEntriesSuccess = createAction(LOAD_CHANNEL_ENTRIES_SUCCESS)
export const loadChannelEntriesFail = createAction(LOAD_CHANNEL_ENTRIES_FAIL)

/* Reducer */

export const reducer = handleActions({

  /* Load channels */

  [LOAD_CHANNELS]: (state) => state.withMutations(record => {
    record.set('channels', Immutable.List())
    record.set('channelsState', REQUEST_PENDING)
  }),

  [LOAD_CHANNELS_SUCCESS]: (state, { payload }) => state.withMutations(record => {
    record.set('channels', convertToListRecord(payload.results, Channel))
    record.set('channelsState', REQUEST_SUCCESS)
  }),

  [LOAD_CHANNELS_FAIL]: (state) => state.withMutations(record => {
    record.set('channels', Immutable.List())
    record.set('channelsState', REQUEST_FAIL)
  }),

  /* Load single channel detail*/

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

  /* Load channel entries of a channel */

  [LOAD_CHANNEL_ENTRIES]: (state) => state.withMutations(record => {
    record.set('currentChannelEntries', Immutable.List())
    record.set('currentChannelEntriesState', REQUEST_PENDING)
  }),

  [LOAD_CHANNEL_ENTRIES_SUCCESS]: (state, { payload }) => state.withMutations(record => {
    record.set('currentChannelEntries', convertToListRecord(payload.results, ChannelEntry))
    record.set('currentChannelEntriesState', REQUEST_SUCCESS)
  }),

  [LOAD_CHANNEL_ENTRIES_FAIL]: (state) => state.withMutations(record => {
    record.set('currentChannelEntries', Immutable.List())
    record.set('currentChannelEntriesState', REQUEST_FAIL)
  }),

}, initialState)
