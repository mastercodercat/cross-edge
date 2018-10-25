import React from 'react'
import { shallow, mount } from 'enzyme'
import { Spin } from 'antd'
import Immutable from 'immutable'

import { Channels } from './index'
import { REQUEST_INITIAL, REQUEST_SUCCESS } from 'constants.js'
import { PaginatedListData } from 'store/common/models'
import { Channel, ChannelData } from 'store/modules/channels'
import channelListMock from 'test/fixtures/channels'
import channelEntryListMock from 'test/fixtures/channelEntries'


const initialProps = {
  channels: PaginatedListData(),
  currentChannelEntries: PaginatedListData(),
  currentChannelEntriesChannel: null,
  loadChannels: e => e,
  setChannelsPage: e => e,
  setChannelsPageSize: e => e,
  loadChannelEntries: e => e,
  setChannelEntriesChannel: e => e,
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

it('should render channel entry list when requested', () => {
  const props = {
    ...initialProps,
    channels: PaginatedListData({
      data: channelListMock,
      state: REQUEST_SUCCESS,
      count: channelListMock.size,
    }),
    currentChannelEntriesChannel: channelListMock.get(0),
    currentChannelEntries: PaginatedListData({
      data: channelEntryListMock,
      state: REQUEST_SUCCESS,
      count: channelEntryListMock.size,
    }),
  }

  const wrapper = mount(<Channels {...props} />)

  expect(wrapper.find('.ant-spin').length).toBe(0)
  expect(wrapper.find('table').at(0).find('tbody tr').length).toBe(2)
  expect(wrapper.find('table').at(1).find('tbody tr').length).toBe(3)
})
