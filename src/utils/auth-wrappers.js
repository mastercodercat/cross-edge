import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import { selectIsAuthenticated } from 'store/modules/auth'


export const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/signin',
  authenticatedSelector: selectIsAuthenticated,
  wrapperDisplayName: 'UserIsAuthenticated'
})

export const userIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: '/',
  allowRedirectBack: false,
  authenticatedSelector: state => !selectIsAuthenticated(state),
  wrapperDisplayName: 'UserIsNotAuthenticated'
})
