import React from 'react'
import { mount } from 'enzyme'

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

// it('should call loadChannel and loadChannelEntries on mount', () => {
//   const loadChannelMock = jest.fn()

//   const channelData = ChannelData({
//     data: Channel(),
//     state: REQUEST_INITIAL,
//   })

//   const wrapper = mount(<ChannelDetail
//     currentChannel={channelData}
//     loadChannel={loadChannelMock}
//     match={{ params: { id: 1 }}}
//   />)

//   expect(loadChannelMock).toHaveBeenCalledTimes(1)
//   expect(loadChannelMock).toHaveBeenLastCalledWith({ id: 1 })
// })
