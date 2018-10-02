import { createAction, handleActions } from 'redux-actions'

import {
  getAuthToken, setAuthToken, clearAuthToken,
  getAuthEmail, setAuthEmail, clearAuthEmail,
} from 'utils/storage'

import { REQUEST_INITIAL } from 'constants.js'
import { generateRequestLoopHandlers, successAction, failAction } from 'utils/state-helpers'

import {
  AUTH_SIGNIN,
  AUTH_SIGNOUT,
} from './constants'
import {
  AuthData,
  State,
} from './models'


/* Initial state */

const initialState = new State({
  auth: AuthData({ data: getAuthToken() || '' }),
  email: getAuthEmail() || '',
})

/* Action creators */

export const signIn = createAction(AUTH_SIGNIN)
export const signInSuccess = createAction(successAction(AUTH_SIGNIN))
export const signInFail = createAction(failAction(AUTH_SIGNIN))
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
