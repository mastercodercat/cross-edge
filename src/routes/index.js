import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { pluralize, dasherize, tableize } from 'inflection'

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
import ChannelEntries from 'containers/ChannelEntries'
import ChannelSearch from 'containers/ChannelSearch'
import BusinessProcessModule from 'containers/BusinessProcessModule'
import ParentContainer from 'containers/ParentContainer'
import ChildList from 'containers/ChildList'
import BusinessProcess from 'containers/BusinessProcess'
import Messages from 'containers/Messages'
import NotificationPollTimer from 'containers/NotificationPollTimer'

import setTypeProp from 'hoc/setTypeProp'


const UnauthenticatedRoutes = () => (
  <Switch>
    <Redirect exact from="/" to="/signin" />
    <Route exact path="/signin" component={SignIn} />
  </Switch>
)

const ChannelListRoutes = ({ location }) => {
  const routeRegexesToShowInModal = [
    /^\/channels\/?(\d+)?$/g,
    /^\/channels\/([^/]+)\/search$/g,
  ]
  let showChildrenInModal = false
  for (let i = 0; i < routeRegexesToShowInModal.length; i += 1) {
    if (routeRegexesToShowInModal[i].test(location.pathname)) {
      showChildrenInModal = true;
      break;
    }
  }

  if (showChildrenInModal) {
    return <Channels>
      <Route exact path="/channels/:id" component={ChannelDetail} />
      <Route exact path="/channels/:serialNumber/search" component={ChannelSearch} />
    </Channels>
  }

  return (
    <Route exact path="/channels/:id/channel-entries" component={ChannelEntries} />
  )
}

export const ObjectListRoutes = ({ type }) => {
  const types = ['subscriber', 'partner', 'site', 'subsite', 'businessProcess']
  const pluralizedType = pluralize(type)
  const typeIndex = types.indexOf(type)
  if (typeIndex === -1) {
    throw new Error('Invalid object type')
  }
  const subtypes = types.slice(typeIndex + 1)
  if (subtypes.length === 0) {
    throw new Error('Invalid parent object type')
  }

  return <ParentContainer type={type}>
    <Route
      exact
      path={`/${pluralizedType}/:parentId`}
      render={props => (
        <Redirect to={`/${pluralizedType}/${props.match.params.parentId}/${dasherize(tableize(subtypes[0]))}`} />
      )}
    />
    {
      subtypes.map(subtype => (
        <RouteWithProps
          key={subtype}
          exact
          path={`/${pluralizedType}/:parentId/${dasherize(tableize(subtype))}`}
          component={setTypeProp(subtype)(ChildList)}
        />
      ))
    }
  </ParentContainer>
}

const AuthenticatedRoutes = () => (
  <DashboardLayout>
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/channels" component={ChannelListRoutes} />
      <Route exact path="/business-process-module" component={BusinessProcessModule} />
      <Route path="/subscribers/:parentId" component={setTypeProp('subscriber')(ObjectListRoutes)} />
      <Route path="/partners/:parentId" component={setTypeProp('partner')(ObjectListRoutes)} />
      <Route path="/sites/:parentId" component={setTypeProp('site')(ObjectListRoutes)} />
      <Route path="/subsites/:parentId" component={setTypeProp('subsite')(ObjectListRoutes)} />
      <Route exact path="/business-processes/:name" component={BusinessProcess} />
      <Route exact path="/notifications" component={Messages} />
    </Switch>
    <NotificationPollTimer />
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
