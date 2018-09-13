import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { selectIsAuthenticated } from 'store/modules/auth'

const locationHelper = locationHelperBuilder({})

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
