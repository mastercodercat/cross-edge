export const selectAuthStore = state => state.get('auth')

export const selectAuthData = state => state.getIn(['auth', 'auth'])

export const selectIsAuthenticated = state => !!state.getIn(['auth', 'auth', 'data'])
