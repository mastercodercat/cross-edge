import Immutable from 'immutable'

import { REQUEST_INITIAL } from 'constants.js'


export const AuthState = Immutable.Record({
  authToken: '',
  authState: REQUEST_INITIAL,
})
