import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import ScrollToTop from 'components/ScrollToTop'

import App from 'containers/App'


const Routes = ({ history }) => (
  <ConnectedRouter history={history}>
    <ScrollToTop>
      <Switch>
        <Route exact path="/" component={App} />
      </Switch>
    </ScrollToTop>
  </ConnectedRouter>
)

export default Routes
