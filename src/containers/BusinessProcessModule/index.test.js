import React from 'react'
import { mount } from 'enzyme'

import { BusinessProcessModule } from './index'

import {
  REQUEST_INITIAL,
  REQUEST_SUCCESS,
} from 'constants.js'
import { Subscriber } from 'store/modules/bpm'
import { PaginatedListData } from 'store/common/models'
import { homeContent } from 'test/fixtures/bpm'


const props = {
  history: {},
  homeContent: PaginatedListData(),
  loadHome: jest.fn(),
}

it('should show spinner when home content not loaded', () => {
  const wrapper = mount(<BusinessProcessModule
    {...props}
  />)

  expect(wrapper.find('.ant-spin').length).not.toEqual(0)
  expect(props.loadHome.mock.calls).toBeTruthy()
})

it('should show business process module page when loaded', () => {
  const localProps = Object.assign({}, props)
  localProps.homeContent = PaginatedListData({
    data: homeContent.map(record => Subscriber(record)),
    state: REQUEST_SUCCESS,
  })

  const wrapper = mount(<BusinessProcessModule
    {...localProps}
  />)

  expect(wrapper.find('h1').text().trim()).toEqual('Business Process Module')
  homeContent.forEach(record => {
    expect(wrapper.text()).toEqual(expect.stringContaining(record.name))
  })
})
