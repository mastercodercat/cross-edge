export const selectAuthStore = state => state.get('auth')

export const selectAuthData = state => state.getIn(['auth', 'auth'])

export const selectAuthEmail = state => state.getIn(['auth', 'email'])

export const selectIsAuthenticated = state => !!state.getIn(['auth', 'auth', 'data'])
