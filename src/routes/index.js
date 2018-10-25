import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import RouteWithProps from 'components/RouteWithProps'
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
import ParentContainer from 'containers/ParentContainer'
import ChildList from 'containers/ChildList'
import BusinessProcess from 'containers/BusinessProcess'
import setTypeProp from 'hoc/setTypeProp'


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

const SubscriberRoutes = () => (
  <ParentContainer type="subscriber">
    <Route
      exact
      path="/subscribers/:parentId"
      render={props => (
        <Redirect to={`/subscribers/${props.match.params.parentId}/partners`} />
      )}
    />
    <RouteWithProps exact path="/subscribers/:parentId/partners" component={setTypeProp('partner')(ChildList)} />
    <RouteWithProps exact path="/subscribers/:parentId/sites" component={setTypeProp('site')(ChildList)} />
  </ParentContainer>
)

const PartnerRoutes = () => (
  <ParentContainer type="partner">
    <Route
      exact
      path="/partners/:parentId"
      render={props => (
        <Redirect to={`/partners/${props.match.params.parentId}/sites`} />
      )}
    />
    <RouteWithProps exact path="/partners/:parentId/sites" component={setTypeProp('site')(ChildList)} />
    <RouteWithProps exact path="/partners/:parentId/business-processes" component={setTypeProp('businessProcess')(ChildList)} />
  </ParentContainer>
)

const SiteRoutes = () => (
  <ParentContainer type="site">
    <Route
      exact
      path="/sites/:parentId"
      render={props => (
        <Redirect to={`/sites/${props.match.params.parentId}/subsites`} />
      )}
    />
    <RouteWithProps exact path="/sites/:parentId/subsites" component={setTypeProp('subsite')(ChildList)} />
    <RouteWithProps exact path="/sites/:parentId/business-processes" component={setTypeProp('businessProcess')(ChildList)} />
  </ParentContainer>
)

const SubsiteRoutes = () => (
  <ParentContainer type="subsite">
    <Route
      exact
      path="/subsites/:parentId"
      render={props => (
        <Redirect to={`/subsites/${props.match.params.parentId}/business-processes`} />
      )}
    />
    <RouteWithProps exact path="/subsites/:parentId/business-processes" component={setTypeProp('businessProcess')(ChildList)} />
  </ParentContainer>
)

const AuthenticatedRoutes = () => (
  <DashboardLayout>
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/channels" component={ChannelManagerRoutes} />
      <Route exact path="/business-process-module" component={BusinessProcessModule} />
      <Route path="/subscribers/:parentId" component={SubscriberRoutes} />
      <Route path="/partners/:parentId" component={PartnerRoutes} />
      <Route path="/sites/:parentId" component={SiteRoutes} />
      <Route path="/subsites/:parentId" component={SubsiteRoutes} />
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
