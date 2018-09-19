import Immutable from 'immutable'
import { createAction, handleActions } from 'redux-actions'

import { convertToListRecord } from 'utils/state-helpers'

import { REQUEST_INITIAL } from 'constants.js'
import { DEFAULT_PAGE_SIZE } from 'config/base'
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
  SET_CHANNEL_ENTRIES_CHANNEL_ID,
  SET_CHANNEL_ENTRIES_PAGE,
  SET_CHANNEL_ENTRIES_PAGE_SIZE,
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
export const setChannelEntriesChannelId = createAction(SET_CHANNEL_ENTRIES_CHANNEL_ID)
export const setChannelEntriesPage = createAction(SET_CHANNEL_ENTRIES_PAGE)
export const setChannelEntriesPageSize = createAction(SET_CHANNEL_ENTRIES_PAGE_SIZE)

/* Reducer */

export const reducer = handleActions({

  /* Load channels */

  ...generateRequestLoopHandlers({
    action: LOAD_CHANNELS,
    dataField: 'channels',
    initialValue: Immutable.List(),
    successPayloadProcessor: payload => convertToListRecord(payload.results, Channel),
    usePagination: true,
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
    dataField: 'currentChannelEntries',
    initialValue: Immutable.List(),
    successPayloadProcessor: payload => convertToListRecord(payload.results, ChannelEntry),
    usePagination: true,
  }),

  [SET_CHANNEL_ENTRIES_CHANNEL_ID]: (state, { payload }) => state.withMutations(record => {
    record.set('currentChannelEntriesChannelId', payload)
  }),

}, initialState)
