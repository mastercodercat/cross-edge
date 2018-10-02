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
  signIn, signInSuccess, signInFail, signOut,
} from './reducer'


/* Auth loop */

it('reducer should return initial state when state not provided', () => {
  const dummyAction = createAction('dummyAction')
  const initialState = reducer(undefined, dummyAction())

  expect(initialState).toBeInstanceOf(State)
  expect(initialState.auth.data).toBe('')
  expect(initialState.auth.state).toBe(REQUEST_INITIAL)
  expect(initialState.email).toBe('')
})

it('reducer should set auth state to pending correctly', () => {
  const prevState = State()
  const state = reducer(prevState, signIn({ email: 'test@test.com'}))

  expect(state.auth.state).toBe(REQUEST_PENDING)
  expect(state.email).toBe('test@test.com')
})

it('reducer should set auth state to success correctly', () => {
  const prevState = State()
  const state = reducer(prevState, signInSuccess({ token: 'dummytoken'}))

  expect(state.auth.state).toBe(REQUEST_SUCCESS)
  expect(state.auth.data).toBe('dummytoken')
})

it('reducer should set auth state to fail correctly', () => {
  let prevState = State()
  prevState = prevState.setIn(['auth', 'data'], 'testtoken')
  const state = reducer(prevState, signInFail())

  expect(state.auth.state).toBe(REQUEST_FAIL)
  expect(state.auth.data).toBe('')
})

it('reducer should sign out correctly', () => {
  let prevState = State()
  prevState = prevState
    .setIn(['auth', 'data'], 'testtoken')
    .setIn(['email'], 'test@test.com')
  const state = reducer(prevState, signOut())

  expect(state.auth.state).toBe(REQUEST_INITIAL)
  expect(state.auth.data).toBe('')
  expect(state.email).toBe('')
})
