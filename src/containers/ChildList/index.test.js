import React from 'react'
import { mount } from 'enzyme'
import Immutable from 'immutable'

import { ChildList } from './index'

import {
  REQUEST_INITIAL,
  REQUEST_SUCCESS,
} from 'constants.js'
import { Subscriber, SubscriberData } from 'store/modules/bpm'
import { Site } from 'store/modules/sites'
import { PaginatedListData } from 'store/common/models'
import { homeContent, sites } from 'test/fixtures/bpm'


const props = {
  parentType: 'subscriber',
  type: 'site',
  match: { params: { parentId: 10 } },
  history: {},
  parent: SubscriberData({
    data: Subscriber(homeContent[0]),
    state: REQUEST_SUCCESS,
  }),
  list: PaginatedListData(),
  loadList: jest.fn(),
}

it('should show spinner when data not loaded', () => {
  const wrapper = mount(<ChildList
    {...props}
  />)

  expect(wrapper.find('h1').text().trim()).toEqual(`Sites for ${props.parent.data.name}`)
  expect(wrapper.find('.ant-spin')).not.toBeNull()
  expect(props.loadList.mock.calls).toBeTruthy()
})

it('should show data when loaded', () => {
  const localProps = Object.assign({}, props)
  localProps.list = PaginatedListData({
    data: Immutable.List(sites.map(site => Site(site))),
    state: REQUEST_SUCCESS,
  })

  const wrapper = mount(<ChildList
    {...localProps}
  />)

  sites.forEach(record => {
    expect(wrapper.text()).toEqual(expect.stringContaining(record.name))
  })
})
