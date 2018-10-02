import Immutable from 'immutable'
import { createAction, handleActions } from 'redux-actions'

import { convertToListRecord } from 'utils/state-helpers'

import { generateRequestLoopHandlers, successAction, failAction } from 'utils/state-helpers'
import { PaginatedListData } from 'store/common/models'

import {
  LOAD_CHANNELS,
  LOAD_CHANNEL,
  LOAD_CHANNEL_ENTRIES,
  SET_CHANNEL_ENTRIES_CHANNEL,
  SET_CHANNEL_ENTRIES_PAGE,
  SET_CHANNEL_ENTRIES_PAGE_SIZE,
} from './constants'

import {
  State,
  Channel,
  ChannelData,
  ChannelEntrySubRecord,
  ChannelEntry,
} from './models'


/* Initial state */

const initialState = new State({
  channels: PaginatedListData(),

  currentChannel: ChannelData(),

  currentChannelEntriesChannel: null,
  currentChannelEntries: PaginatedListData(),
})

/* Action creators */

export const loadChannels = createAction(LOAD_CHANNELS)
export const loadChannelsSuccess = createAction(successAction(LOAD_CHANNELS))
export const loadChannelsFail = createAction(failAction(LOAD_CHANNELS))

export const loadChannel = createAction(LOAD_CHANNEL)
export const loadChannelSuccess = createAction(successAction(LOAD_CHANNEL))
export const loadChannelFail = createAction(failAction(LOAD_CHANNEL))

export const loadChannelEntries = createAction(LOAD_CHANNEL_ENTRIES)
export const loadChannelEntriesSuccess = createAction(successAction(LOAD_CHANNEL_ENTRIES))
export const loadChannelEntriesFail = createAction(failAction(LOAD_CHANNEL_ENTRIES))
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
    getDataFromPayload: payload => convertToListRecord(payload.results, record => (
      ChannelEntry({
        ...record,
        channel: ChannelEntrySubRecord(record.channel),
        product: ChannelEntrySubRecord(record.product),
      })
    )),
    usePagination: true,
  }),

  [SET_CHANNEL_ENTRIES_CHANNEL]: (state, { payload }) => state.withMutations(record => {
    record.set('currentChannelEntriesChannel', Channel(payload))
  }),

}, initialState)
