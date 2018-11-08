import React from 'react'
import { shallow, mount } from 'enzyme'
import { Spin } from 'antd'
import Immutable from 'immutable'

import { changeInputValue } from 'test/helpers'
import { Channels } from './index'
import { REQUEST_INITIAL, REQUEST_SUCCESS } from 'constants.js'
import { PaginatedListData } from 'store/common/models'
import { Channel, ChannelData } from 'store/modules/channels'
import channelListMock from 'test/fixtures/channels'
import channelEntryListMock from 'test/fixtures/channelEntries'


const initialProps = {
  channels: PaginatedListData(),
  currentChannelEntries: PaginatedListData(),
  loadChannels: e => e,
  setChannelsPage: e => e,
  setChannelsPageSize: e => e,
  loadChannelEntries: e => e,
  setChannelEntriesPage: e => e,
  setChannelEntriesPageSize: e => e,
  history: { push: e => e },
  location: { pathname: '/channels' },
}

it('should spinner when data not loaded', () => {
  const wrapper = mount(<Channels {...initialProps} />)

  expect(wrapper.find('.ant-spin').length).not.toBe(0)
})

it('should render list when data loaded', () => {
  const props = {
    ...initialProps,
    channels: PaginatedListData({
      data: channelListMock,
      state: REQUEST_SUCCESS,
      count: channelListMock.size,
    })
  }

  const wrapper = mount(<Channels {...props} />)

  expect(wrapper.find('.ant-spin').length).toBe(0)
  expect(wrapper.find('table').at(0).find('tbody tr').length).toBe(2)
})

it('should go to search route when search requested', () => {
  const historyPushMock = jest.fn()

  const props = {
    ...initialProps,
    channels: PaginatedListData({
      data: channelListMock,
      state: REQUEST_SUCCESS,
      count: channelListMock.size,
    }),
    history: { push: historyPushMock },
  }

  const wrapper = mount(<Channels {...props} />)

  changeInputValue(wrapper.find('.searchWrapper').find('input'), '(100)10')
  wrapper.find('.searchWrapper').find('button').simulate('click')

  expect(historyPushMock.mock.calls[0][0]).toEqual('/channels/(100)10/search')
})

it('should not go to search route with empty search string', () => {
  const historyPushMock = jest.fn()

  const props = {
    ...initialProps,
    channels: PaginatedListData({
      data: channelListMock,
      state: REQUEST_SUCCESS,
      count: channelListMock.size,
    }),
    history: { push: historyPushMock },
  }

  const wrapper = mount(<Channels {...props} />)

  wrapper.find('.searchWrapper').find('button').simulate('click')

  expect(historyPushMock.mock.calls.length).toEqual(0)
})
