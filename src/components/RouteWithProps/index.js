import React from 'react'
import { Route } from 'react-router-dom'


const RouteWithProps = ({ path, exact, strict, location, component: Component, ...rest }) => (
  <Route
    path={path}
    exact={exact}
    strict={strict}
    location={location}
    render={(props) => <Component {...props} {...rest} />}
  />
)

export default RouteWithProps
