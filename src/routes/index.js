import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import ScrollToTop from 'components/ScrollToTop'
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from 'utils/auth-wrappers'
import { selectIsAuthenticated } from 'store/modules/auth'

import SignIn from 'containers/SignIn'
import DashboardLayout from 'containers/DashboardLayout'
import Channels from 'containers/Channels'


const UnauthenticatedRoutes = () => (
  <Switch>
    <Redirect exact from="/" to="/signin" />
    <Route exact path="/signin" component={SignIn} />
  </Switch>
)

const AuthenticatedRoutes = () => (
  <DashboardLayout>
    <Switch>
      <Redirect exact from="/" to="/channels" />
      <Route exact path="/channels" component={Channels} />
    </Switch>
  </DashboardLayout>
)

const Routes = ({ store, history }) => (
  <ConnectedRouter history={history}>
    <ScrollToTop>
      <Route
        path="/"
        component={(
          selectIsAuthenticated(store.getState()) ?
          userIsAuthenticated(AuthenticatedRoutes) :
          userIsNotAuthenticated(UnauthenticatedRoutes)
        )}
      />
    </ScrollToTop>
  </ConnectedRouter>
)

export default Routes
