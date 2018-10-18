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
import Partner from 'containers/Partner'
import PartnerSites from 'containers/PartnerSites'
import PartnerBusinessProcesses from 'containers/PartnerBusinessProcesses'
import Site from 'containers/Site'
import SiteSubsites from 'containers/SiteSubsites'
import SiteBusinessProcesses from 'containers/SiteBusinessProcesses'
import BusinessProcess from 'containers/BusinessProcess'


const UnauthenticatedRoutes = () => (
  <Switch>
    <Redirect exact from="/" to="/signin" />
    <Route exact path="/signin" component={SignIn} />
  </Switch>
)

const ChannelManagerRoutes = () => (
  <Channels>
    <Route exact path="/channels/:id" component={ChannelDetail} />
  </Channels>
)

const PartnerRoutes = () => (
  <Partner>
    <Route
      exact
      path="/partners/:id"
      render={props => (
        <Redirect to={`/partners/${props.match.params.id}/sites`} />
      )}
    />
    <Route exact path="/partners/:partnerId/sites" component={PartnerSites} />
    <Route exact path="/partners/:partnerId/business-processes" component={PartnerBusinessProcesses} />
  </Partner>
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
    <Route exact path="/sites/:siteId/business-processes" component={SiteBusinessProcesses} />
  </Site>
)

const AuthenticatedRoutes = () => (
  <DashboardLayout>
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/channels" component={ChannelManagerRoutes} />
      <Route exact path="/business-process-module" component={BusinessProcessModule} />
      <Route path="/partners/:id" component={PartnerRoutes} />
      <Route path="/sites/:id" component={SiteRoutes} />
      <Route exact path="/subsites/:subsiteId/business-processes" component={SiteBusinessProcesses} />
      <Route exact path="/business-processes/:name" component={BusinessProcess} />
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
