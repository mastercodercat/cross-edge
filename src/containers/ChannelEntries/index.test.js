import React from 'react'
import { mount } from 'enzyme'
import Immutable from 'immutable'

import { ChannelEntries } from './index'
import { REQUEST_INITIAL, REQUEST_SUCCESS } from 'constants.js'
import { PaginatedListData } from 'store/common/models'
import { Channel, ChannelData, ChannelEntry } from 'store/modules/channels'
import channelListMock from 'test/fixtures/channels'
import channelEntryListMock from 'test/fixtures/channelEntries'


const defaultProps = {
  currentChannel: null,
  currentChannelEntries: null,
  loadChannel: e => e,
  loadChannelEntries: e => e,
  setChannelEntriesPage: e => e,
  setChannelEntriesPageSize: e => e,
}

it('should render channel entries when loaded', () => {
  const channel = channelListMock.get(0)

  const channelData = ChannelData({
    data: channel,
    state: REQUEST_SUCCESS,
  })

  const channelEntryListData = PaginatedListData({
    data: channelEntryListMock,
    state: REQUEST_SUCCESS,
  })

  const props = {
    ...defaultProps,
    currentChannel: channelData,
    currentChannelEntries: channelEntryListData,
  }

  const wrapper = mount(<ChannelEntries
    {...props}
    match={{ params: { id: 2 }}}
  />)

  expect(wrapper.text()).toEqual(expect.stringContaining(channel.name))
})

it('should call loadChannel and loadChannelEntries on mount', () => {
  const channelData = ChannelData({
    data: Channel(),
    state: REQUEST_INITIAL,
  })

  const channelEntryListData = PaginatedListData({
    data: Immutable.List(),
    state: REQUEST_INITIAL,
  })

  const props = {
    ...defaultProps,
    currentChannel: channelData,
    currentChannelEntries: channelEntryListData,
    loadChannel: jest.fn(),
    loadChannelEntries: jest.fn(),
  }

  const wrapper = mount(<ChannelEntries
    {...props}
    match={{ params: { id: 1 }}}
  />)

  expect(props.loadChannel).toHaveBeenCalledTimes(1)
  expect(props.loadChannel).toHaveBeenLastCalledWith({ id: 1 })
  expect(props.loadChannelEntries).toHaveBeenCalledTimes(1)
  expect(props.loadChannelEntries).toHaveBeenLastCalledWith({ channelId: 1 })
})
