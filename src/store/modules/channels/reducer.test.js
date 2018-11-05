import { createAction } from 'redux-actions'

import {
  REQUEST_INITIAL,
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_FAIL
} from 'constants.js'
import { successAction, failAction } from 'utils/state-helpers'
import { State } from './models'
import {
  reducer,
  loadChannels, loadChannelsSuccess, loadChannelsFail,
  loadChannel, loadChannelSuccess, loadChannelFail,
  loadChannelEntries, loadChannelEntriesSuccess, loadChannelEntriesFail,
  setChannelEntriesPage, setChannelEntriesPageSize,
} from './reducer'

import channelListMock from 'test/fixtures/channels'
import channelEntryListMock from 'test/fixtures/channelEntries'


it('reducer should return initial state when state not provided', () => {
  const dummyAction = createAction('dummyAction')
  const initialState = reducer(undefined, dummyAction())

  expect(initialState).toBeInstanceOf(State)

  expect(initialState.channels.data.size).toBe(0)
  expect(initialState.channels.state).toBe(REQUEST_INITIAL)
  expect(initialState.channels.count).toBe(0)
  expect(initialState.channels.page).toBe(1)

  expect(initialState.currentChannelEntries.data.size).toBe(0)
  expect(initialState.currentChannelEntries.state).toBe(REQUEST_INITIAL)
  expect(initialState.currentChannelEntries.count).toBe(0)
  expect(initialState.currentChannelEntries.page).toBe(1)
})

/* channels list actions */

it('reducer should set channels state to pending correctly', () => {
  const prevState = State()
  const state = reducer(prevState, loadChannels())

  expect(state.channels.state).toBe(REQUEST_PENDING)
})

it('reducer should set channels state to success correctly', () => {
  const prevState = State()
  const state = reducer(prevState, loadChannelsSuccess({
    count: 1,
    results: [channelListMock.get(0).toJS()]
  }))

  expect(state.channels.state).toBe(REQUEST_SUCCESS)
  expect(state.channels.data.size).toBe(1)
  expect(state.channels.count).toBe(1)
  expect(state.channels.data.getIn([0, 'id'])).toBe(channelListMock.getIn([0, 'id']))
})

it('reducer should set channels state to fail correctly', () => {
  let prevState = State()
  const state = reducer(prevState, loadChannelsFail())

  expect(state.channels.state).toBe(REQUEST_FAIL)
})

/* channel detail actions */

it('reducer should set channel state to pending correctly', () => {
  const prevState = State()
  const state = reducer(prevState, loadChannel())

  expect(state.currentChannel.state).toBe(REQUEST_PENDING)
})

it('reducer should set channel state to success correctly', () => {
  const prevState = State()
  const state = reducer(prevState, loadChannelSuccess(channelListMock.get(0).toJS()))

  expect(state.currentChannel.state).toBe(REQUEST_SUCCESS)
  expect(state.currentChannel.data.id).toBe(channelListMock.getIn([0, 'id']))
})

it('reducer should set channel state to fail correctly', () => {
  let prevState = State()
  const state = reducer(prevState, loadChannelFail())

  expect(state.currentChannel.state).toBe(REQUEST_FAIL)
})

/* channel entry list actions */

it('reducer should set currentChannelEntries state to pending correctly', () => {
  const prevState = State()
  const state = reducer(prevState, loadChannelEntries())

  expect(state.currentChannelEntries.state).toBe(REQUEST_PENDING)
})

it('reducer should set currentChannelEntries state to success correctly', () => {
  const prevState = State()
  const state = reducer(prevState, loadChannelEntriesSuccess({
    count: 1,
    results: [channelEntryListMock.get(0).toJS()]
  }))

  expect(state.currentChannelEntries.state).toBe(REQUEST_SUCCESS)
  expect(state.currentChannelEntries.data.size).toBe(1)
  expect(state.currentChannelEntries.count).toBe(1)
  expect(state.currentChannelEntries.data.getIn([0, 'id'])).toBe(channelEntryListMock.getIn([0, 'id']))
})

it('reducer should set currentChannelEntries state to fail correctly', () => {
  let prevState = State()
  const state = reducer(prevState, loadChannelEntriesFail())

  expect(state.currentChannelEntries.state).toBe(REQUEST_FAIL)
})
