import Immutable from 'immutable'
import { createAction, handleActions } from 'redux-actions'

import { convertToListRecord } from 'utils/state-helpers'

import { generateRequestLoopHandlers } from 'utils/state-helpers'
import { PaginatedListData } from 'store/common/models'

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
  SET_CHANNEL_ENTRIES_CHANNEL,
  SET_CHANNEL_ENTRIES_PAGE,
  SET_CHANNEL_ENTRIES_PAGE_SIZE,
} from './constants'

import {
  InitialState,
  Channel,
  ChannelData,
  ChannelEntry,
} from './models'


/* Initial state */

const initialState = new InitialState({
  channels: PaginatedListData(),

  currentChannel: ChannelData(),

  currentChannelEntriesChannel: null,
  currentChannelEntries: PaginatedListData(),
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
export const setChannelEntriesChannel = createAction(SET_CHANNEL_ENTRIES_CHANNEL)
export const setChannelEntriesPage = createAction(SET_CHANNEL_ENTRIES_PAGE)
export const setChannelEntriesPageSize = createAction(SET_CHANNEL_ENTRIES_PAGE_SIZE)

/* Reducer */

export const reducer = handleActions({

  /* Load channels */

  ...generateRequestLoopHandlers({
    action: LOAD_CHANNELS,
    dataField: 'channels',
    initialValue: Immutable.List(),
    getDataFromPayload: payload => convertToListRecord(payload.results, Channel),
    usePagination: true,
  }),

  /* Load single channel detail*/

  ...generateRequestLoopHandlers({
    action: LOAD_CHANNEL,
    dataField: 'currentChannel',
    getDataFromPayload: payload => Channel(payload),
  }),

  /* Load channel entries of a channel */

  ...generateRequestLoopHandlers({
    action: LOAD_CHANNEL_ENTRIES,
    dataField: 'currentChannelEntries',
    initialValue: Immutable.List(),
    getDataFromPayload: payload => convertToListRecord(payload.results, ChannelEntry),
    usePagination: true,
  }),

  [SET_CHANNEL_ENTRIES_CHANNEL]: (state, { payload }) => state.withMutations(record => {
    record.set('currentChannelEntriesChannel', Channel(payload))
  }),

}, initialState)
