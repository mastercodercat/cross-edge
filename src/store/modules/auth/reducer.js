import { createAction, handleActions } from 'redux-actions'

import { getAuthToken, setAuthToken, clearAuthToken } from 'utils/storage'

import {
  REQUEST_INITIAL,
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_FAIL, } from 'constants.js'
import {
  AUTH_SIGNIN,
  AUTH_SIGNIN_SUCCESS,
  AUTH_SIGNIN_FAIL,
  AUTH_SIGNOUT } from './constants'
import {
  AuthState } from './models'


/* Initial state */

const initialState = new AuthState({
  authToken: getAuthToken() || '',
  authState: REQUEST_INITIAL,
})

/* Action creators */

export const signIn = createAction(AUTH_SIGNIN)
export const signInSuccess = createAction(AUTH_SIGNIN_SUCCESS)
export const signInFail = createAction(AUTH_SIGNIN_FAIL)
export const signOut = createAction(AUTH_SIGNOUT)

/* Reducer */

export const reducer = handleActions({

  [AUTH_SIGNIN]: (state) => state.withMutations(record => {
    record.set('authState', REQUEST_PENDING)
  }),

  [AUTH_SIGNIN_SUCCESS]: (state, { payload }) => state.withMutations(record => {
    record.set('authToken', payload.token)
    setAuthToken(payload.token)
    record.set('authState', REQUEST_SUCCESS)
  }),

  [AUTH_SIGNIN_FAIL]: (state) => state.withMutations(record => {
    record.set('authToken', '')
    record.set('authState', REQUEST_FAIL)
    clearAuthToken()
  }),

  [AUTH_SIGNOUT]: (state) => state.withMutations(record => {
    record.set('authToken', '')
    record.set('authState', REQUEST_INITIAL)
    clearAuthToken()
  }),

}, initialState)
