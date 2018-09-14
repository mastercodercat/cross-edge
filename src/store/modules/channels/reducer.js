import { createAction, handleActions } from 'redux-actions'

import {
  REQUEST_INITIAL,
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_FAIL,
} from 'constants.js'
import { convertToListRecord } from 'utils/state-helpers'
import {
  LOAD_CHANNELS,
  LOAD_CHANNELS_SUCCESS,
  LOAD_CHANNELS_FAIL
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
})

/* Action creators */

export const loadChannels = createAction(LOAD_CHANNELS)
export const loadChannelsSuccess = createAction(LOAD_CHANNELS_SUCCESS)
export const loadChannelsFail = createAction(LOAD_CHANNELS_FAIL)

/* Reducer */

export const reducer = handleActions({

  [LOAD_CHANNELS]: (state) => state.withMutations(record => {
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

}, initialState)
