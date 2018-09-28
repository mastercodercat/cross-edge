import React from 'react'
import { shallow, mount } from 'enzyme'
import { Spin } from 'antd'

import { Channels } from './index'
import { REQUEST_INITIAL, REQUEST_SUCCESS } from 'constants.js'
import { PaginatedListData } from 'store/common/models'
import { Channel, ChannelData } from 'store/modules/channels'


const initialProps = {
  channels: PaginatedListData(),
  currentChannelEntries: PaginatedListData(),
  currentChannelEntriesChannel: null,
  loadChannels: e => e,
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

// it('should render list when data loaded', () => {
//   const props = {
//     ...initialProps,
//     channels: PaginatedListData({
//       data: 
//     })
//   }
//   const wrapper = shallow(<Channels {...props} />)

//   const spin = wrapper.find(Spin)
//   expect(spin.prop('spinning')).toBe(true)
// })
