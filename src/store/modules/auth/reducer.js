import { createAction, handleActions } from 'redux-actions'

import { getAuthToken, setAuthToken, clearAuthToken } from 'utils/storage'

import {
  AUTH_SIGNIN_SUCCESS,
  AUTH_SIGNIN_FAIL,
  AUTH_SIGNOUT } from './constants'
import {
  AuthState } from './models'


/* Initial state */

const initialState = new AuthState({
  authToken: getAuthToken() || '',
})

/* Action creators */

export const signInSuccess = createAction(AUTH_SIGNIN_SUCCESS)
export const signInFail = createAction(AUTH_SIGNIN_FAIL)
export const signOut = createAction(AUTH_SIGNOUT)

/* Reducer */

export const reducer = handleActions({

  [AUTH_SIGNIN_SUCCESS]: (state, { payload }) => state.withMutations(record => {
    record.set('authToken', payload.token)
    setAuthToken(payload.token)
  }),

  [AUTH_SIGNIN_FAIL]: (state) => state.withMutations(record => {
    record.set('authToken', '')
    record.set('signInFailed', true)
    clearAuthToken()
  }),

  [AUTH_SIGNOUT]: (state) => state.withMutations(record => {
    record.set('authToken', '')
    record.set('signInFailed', false)
    clearAuthToken()
  }),

}, initialState)
