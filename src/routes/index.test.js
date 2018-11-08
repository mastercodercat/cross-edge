import React from 'react'
import { shallow } from 'enzyme'
import { Route } from 'react-router-dom'

import RouteWithProps from 'components/RouteWithProps'
import { HierarchyRoutes } from './index'


it('should render subroutes correctly for subscriber parent', () => {
  const wrapper = shallow(<HierarchyRoutes type="subscriber" />)

  expect(wrapper.find(Route).length).toEqual(1)
  expect(wrapper.find(RouteWithProps).length).toEqual(4)
  expect(wrapper.find(RouteWithProps).at(0).prop('path')).toEqual('/subscribers/:parentId/partners')
  expect(wrapper.find(RouteWithProps).at(1).prop('path')).toEqual('/subscribers/:parentId/sites')
  expect(wrapper.find(RouteWithProps).at(2).prop('path')).toEqual('/subscribers/:parentId/subsites')
  expect(wrapper.find(RouteWithProps).at(3).prop('path')).toEqual('/subscribers/:parentId/business-processes')
})

it('should render subroutes correctly for partner parent', () => {
  const wrapper = shallow(<HierarchyRoutes type="partner" />)

  expect(wrapper.find(Route).length).toEqual(1)
  expect(wrapper.find(RouteWithProps).length).toEqual(3)
  expect(wrapper.find(RouteWithProps).at(0).prop('path')).toEqual('/partners/:parentId/sites')
  expect(wrapper.find(RouteWithProps).at(1).prop('path')).toEqual('/partners/:parentId/subsites')
  expect(wrapper.find(RouteWithProps).at(2).prop('path')).toEqual('/partners/:parentId/business-processes')
})

it('should render subroutes correctly for site parent', () => {
  const wrapper = shallow(<HierarchyRoutes type="site" />)

  expect(wrapper.find(Route).length).toEqual(1)
  expect(wrapper.find(RouteWithProps).length).toEqual(2)
  expect(wrapper.find(RouteWithProps).at(0).prop('path')).toEqual('/sites/:parentId/subsites')
  expect(wrapper.find(RouteWithProps).at(1).prop('path')).toEqual('/sites/:parentId/business-processes')
})

it('should render subroutes correctly for subsite parent', () => {
  const wrapper = shallow(<HierarchyRoutes type="subsite" />)

  expect(wrapper.find(Route).length).toEqual(1)
  expect(wrapper.find(RouteWithProps).length).toEqual(1)
  expect(wrapper.find(RouteWithProps).at(0).prop('path')).toEqual('/subsites/:parentId/business-processes')
})
