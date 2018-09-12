export const selectAuth = state => state.get('auth')

export const selectIsAuthenticated = state => !!state.getIn(['auth', 'authToken'])
