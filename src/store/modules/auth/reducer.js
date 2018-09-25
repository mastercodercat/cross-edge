import { createAction, handleActions } from 'redux-actions'

import {
  getAuthToken, setAuthToken, clearAuthToken,
  getAuthEmail, setAuthEmail, clearAuthEmail,
} from 'utils/storage'

import { REQUEST_INITIAL } from 'constants.js'
import { generateRequestLoopHandlers } from 'utils/state-helpers'

import {
  AUTH_SIGNIN,
  AUTH_SIGNIN_SUCCESS,
  AUTH_SIGNIN_FAIL,
  AUTH_SIGNOUT,
} from './constants'
import {
  AuthData,
  InitialState,
} from './models'


/* Initial state */

const initialState = new InitialState({
  auth: AuthData({ data: getAuthToken() || '' }),
  email: getAuthEmail() || '',
})

/* Action creators */

export const signIn = createAction(AUTH_SIGNIN)
export const signInSuccess = createAction(AUTH_SIGNIN_SUCCESS)
export const signInFail = createAction(AUTH_SIGNIN_FAIL)
export const signOut = createAction(AUTH_SIGNOUT)

/* Reducer */

export const reducer = handleActions({

  ...generateRequestLoopHandlers({
    action: AUTH_SIGNIN,
    dataField: 'auth',
    initialValue: '',
    getDataFromPayload: payload => payload.token,
    onInitial: (record, payload) => setAuthEmail(payload.email),
    onSuccess: (record, payload) => setAuthToken(payload.token),
    onFail: () => {
      clearAuthToken()
      clearAuthEmail()
    },
  }),

  [AUTH_SIGNOUT]: (state) => state.withMutations(record => {
    record.setIn(['auth', 'data'], '')
    record.setIn(['auth', 'state'], REQUEST_INITIAL)
    clearAuthToken()
    clearAuthEmail()
  }),

}, initialState)
