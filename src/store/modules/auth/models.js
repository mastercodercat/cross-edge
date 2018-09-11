import Immutable from 'immutable'


export const AuthState = Immutable.Record({
  authToken: '',
  signInFailed: false,
})
