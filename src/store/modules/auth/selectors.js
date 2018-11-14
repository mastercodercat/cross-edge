import { decodeJWT } from 'utils/data'


export const selectAuthStore = state => state.get('auth')

export const selectAuthData = state => state.getIn(['auth', 'auth'])

export const selectAuthEmail = state => state.getIn(['auth', 'email'])

export const selectIsAuthenticated = state => {
  const token = state.getIn(['auth', 'auth', 'data'])
  if (!token) {
    return false
  }
  const payload = decodeJWT(token)
  return payload && payload.exp && new Date(payload.exp * 1000) > new Date()
}
