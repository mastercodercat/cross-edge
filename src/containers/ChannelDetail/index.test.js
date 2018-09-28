import React from 'react'
import { mount } from 'enzyme'

import { ChannelDetail } from './index'
import { REQUEST_INITIAL, REQUEST_SUCCESS } from 'constants.js'
import { Channel, ChannelData } from 'store/modules/channels'


it('should render detail when loaded', () => {
  const channelDataRaw = {
    id: 2,
    name: "Musicians Store",
    description: "A Fake Store used for testing",
    gln: "(416)0747585012348",
    url: "",
    address_1: "123 Street",
    address_2: "24",
    city: "Philadelphia",
    state: "PA",
    country: "United States",
    postal_code: "19145",
    time_zone_offset: 0
  }

  const channel = Channel(channelDataRaw)
  const channelData = ChannelData({
    data: channel,
    state: REQUEST_SUCCESS,
  })

  const wrapper = mount(<ChannelDetail
    currentChannel={channelData}
    loadChannel={e => e}
    match={{ params: { id: 2 }}}
  />)

  expect(wrapper.find('.ant-spin').length).toBe(0)

  const wrapperText = wrapper.text()
  expect(wrapperText).toContain(channelDataRaw.name)
  expect(wrapperText).toContain(channelDataRaw.description)
  expect(wrapperText).toContain(channelDataRaw.address_1)
  expect(wrapperText).toContain(channelDataRaw.address_2)
  expect(wrapperText).toContain(channelDataRaw.city)
  expect(wrapperText).toContain(channelDataRaw.state)
  expect(wrapperText).toContain(channelDataRaw.country)
  expect(wrapperText).toContain(channelDataRaw.postal_code)
})

it('should show spinner when not loaded', () => {
  const channelData = ChannelData({
    data: Channel(),
    state: REQUEST_INITIAL,
  })

  const wrapper = mount(<ChannelDetail
    currentChannel={channelData}
    loadChannel={e => e}
    match={{ params: { id: 2 }}}
  />)

  expect(wrapper.find('.ant-spin').length).not.toBe(0)
})

it('should call loadChannel on mount', () => {
  const loadChannelMock = jest.fn()

  const channelData = ChannelData({
    data: Channel(),
    state: REQUEST_INITIAL,
  })

  const wrapper = mount(<ChannelDetail
    currentChannel={channelData}
    loadChannel={loadChannelMock}
    match={{ params: { id: 1 }}}
  />)

  expect(loadChannelMock).toHaveBeenCalledTimes(1)
  expect(loadChannelMock).toHaveBeenLastCalledWith({ id: 1 })
})
