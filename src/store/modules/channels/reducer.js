import Immutable from 'immutable'
import { createAction, handleActions } from 'redux-actions'

import { convertToListRecord } from 'utils/state-helpers'

import { REQUEST_INITIAL } from 'constants.js'
import { generateRequestLoopHandlers } from 'utils/state-helpers'

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

  ...generateRequestLoopHandlers({
    action: LOAD_CHANNELS,
    dataField: 'channels',
    initialValue: Immutable.List(),
    successPayloadProcessor: payload => convertToListRecord(payload.results, Channel),
  }),

  /* Load single channel detail*/

  ...generateRequestLoopHandlers({
    action: LOAD_CHANNEL,
    dataField: 'currentChannel',
    successPayloadProcessor: payload => Channel(payload),
  }),

  /* Load channel entries of a channel */

  ...generateRequestLoopHandlers({
    action: LOAD_CHANNEL_ENTRIES,
    dataField: 'currentChannel',
    initialValue: Immutable.List(),
    successPayloadProcessor: payload => convertToListRecord(payload.results, ChannelEntry),
  }),

}, initialState)
