import Immutable from 'immutable'
import { createAction, handleActions } from 'redux-actions'

import { convertToListRecord } from 'utils/state-helpers'

import {
  requestLoopHandlersForGet,
  successAction, failAction, setPageAction, setPageSizeAction,
} from 'utils/state-helpers'
import { PaginatedListData } from 'store/common/models'

import {
  LOAD_CHANNELS,
  LOAD_CHANNEL,
  LOAD_CHANNEL_ENTRIES,
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

  currentChannelEntries: PaginatedListData(),
})

/* Action creators */

export const loadChannels = createAction(LOAD_CHANNELS)
export const loadChannelsSuccess = createAction(successAction(LOAD_CHANNELS))
export const loadChannelsFail = createAction(failAction(LOAD_CHANNELS))
export const setChannelsPage = createAction(setPageAction(LOAD_CHANNELS))
export const setChannelsPageSize = createAction(setPageSizeAction(LOAD_CHANNELS))

export const loadChannel = createAction(LOAD_CHANNEL)
export const loadChannelSuccess = createAction(successAction(LOAD_CHANNEL))
export const loadChannelFail = createAction(failAction(LOAD_CHANNEL))

export const loadChannelEntries = createAction(LOAD_CHANNEL_ENTRIES)
export const loadChannelEntriesSuccess = createAction(successAction(LOAD_CHANNEL_ENTRIES))
export const loadChannelEntriesFail = createAction(failAction(LOAD_CHANNEL_ENTRIES))
export const setChannelEntriesPage = createAction(setPageAction(LOAD_CHANNEL_ENTRIES))
export const setChannelEntriesPageSize = createAction(setPageSizeAction(LOAD_CHANNEL_ENTRIES))

/* Reducer */

export const reducer = handleActions({

  /* Load channels */

  ...requestLoopHandlersForGet({
    action: LOAD_CHANNELS,
    dataField: 'channels',
    initialValue: Immutable.List(),
    getDataFromPayload: payload => convertToListRecord(payload.results, Channel),
    usePagination: true,
  }),

  /* Load single channel detail */

  ...requestLoopHandlersForGet({
    action: LOAD_CHANNEL,
    dataField: 'currentChannel',
    getDataFromPayload: payload => Channel(payload),
  }),

  /* Load channel entries of a channel */

  ...requestLoopHandlersForGet({
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

}, initialState)
