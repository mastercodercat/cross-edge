import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import ScrollToTop from 'components/ScrollToTop'

import App from 'containers/App'
import SignIn from 'containers/SignIn'
import {
  userIsAuthenticated,
  userIsNotAuthenticated } from 'utils/auth-wrappers'


const Routes = ({ history }) => (
  <ConnectedRouter history={history}>
    <ScrollToTop>
      <Switch>
        <Route exact path="/signin" component={userIsNotAuthenticated(SignIn)} />
        <Route exact path="/" component={userIsAuthenticated(App)} />
      </Switch>
    </ScrollToTop>
  </ConnectedRouter>
)

export default Routes
