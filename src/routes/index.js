import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import ScrollToTop from 'components/ScrollToTop'
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from 'utils/auth-wrappers'

import SignIn from 'containers/SignIn'
import DashboardLayout from 'containers/DashboardLayout'
import Dashboard from 'containers/Dashboard'
import Channels from 'containers/Channels'
import ChannelDetail from 'containers/ChannelDetail'
import BusinessProcessModule from 'containers/BusinessProcessModule'
import Site from 'containers/Site'
import SiteSubsites from 'containers/SiteSubsites'
import SiteBusinessProcesses from 'containers/SiteBusinessProcesses'


const ChannelManagerRoutes = () => (
  <Channels>
    <Route exact path="/channels/:id" component={ChannelDetail} />
  </Channels>
)

const SiteRoutes = () => (
  <Site>
    <Route
      exact
      path="/sites/:id"
      render={props => (
        <Redirect to={`/sites/${props.match.params.id}/sublocations`} />
      )}
    />
    <Route exact path="/sites/:id/sublocations" component={SiteSubsites} />
    <Route exact path="/sites/:id/business-processes" component={SiteBusinessProcesses} />
  </Site>
)

const UnauthenticatedRoutes = () => (
  <Switch>
    <Redirect exact from="/" to="/signin" />
    <Route exact path="/signin" component={SignIn} />
  </Switch>
)

const AuthenticatedRoutes = () => (
  <DashboardLayout>
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/channels" component={ChannelManagerRoutes} />
      <Route exact path="/business-process-module" component={BusinessProcessModule} />
      <Route path="/sites/:id" component={SiteRoutes} />
    </Switch>
  </DashboardLayout>
)

const Routes = ({ history }) => (
  <ConnectedRouter history={history}>
    <ScrollToTop>
      <Route path="/sign(.*)" component={userIsNotAuthenticated(UnauthenticatedRoutes)} />
      <Route path="/" component={userIsAuthenticated(AuthenticatedRoutes)} />
    </ScrollToTop>
  </ConnectedRouter>
)

export default Routes
