import Immutable from 'immutable'

import { createDetailDataType } from 'store/common/models'


export const AuthData = createDetailDataType('')

export const State = Immutable.Record({
  auth: AuthData(),
  email: '',
})
