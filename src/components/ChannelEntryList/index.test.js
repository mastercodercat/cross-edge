import React from 'react'
import { mount } from 'enzyme'

import ChannelEntryList from './index'
import { mockPagination } from 'utils/test-helpers'
import { ChannelEntry, ChannelEntrySubRecord } from 'store/modules/channels'


it('should show spinner when data not loaded', () => {
  const wrapper = mount(<ChannelEntryList
    loading
    channelEntries={[]}
    actions={[]}
    pagination={mockPagination}
  />)

  expect(wrapper.find('.ant-spin')).not.toBeNull()
})

it('should display data records with actions when data loaded', () => {
  const data = [
    ChannelEntry({
      channel: ChannelEntrySubRecord({ id: 1, name: 'Channel A' }),
      product: ChannelEntrySubRecord({ id: 1, name: 'Product 1' }),
      serial_number: 'DHYUD11001',
      ship_date: '2018-10-01',
    }),
    ChannelEntry({
      channel: ChannelEntrySubRecord({ id: 1, name: 'Channel A' }),
      product: ChannelEntrySubRecord({ id: 2, name: 'Product 2' }),
      serial_number: 'DHYUD11002',
      ship_date: '2018-10-02',
    }),
    ChannelEntry({
      channel: ChannelEntrySubRecord({ id: 2, name: 'Channel B' }),
      product: ChannelEntrySubRecord({ id: 2, name: 'Product 2' }),
      serial_number: 'DHYUD11010',
      ship_date: '2018-10-03',
    }),
  ]

  const actions = [
    { text: 'Edit', handler: e => e },
    { text: 'Delete', handler: e => e },
  ]

  const wrapper = mount(<ChannelEntryList
    loading={false}
    channelEntries={data}
    actions={actions}
    pagination={mockPagination}
  />)

  expect(wrapper.find('tbody tr')).toHaveLength(3)

  const actionCell = wrapper.find('tbody tr').at(0).find('td').at(3)

  expect(actionCell.find('a')).toHaveLength(2)
  for (let i = 0; i < actions.length; i += 1) {
    expect(actionCell.childAt(i).text()).toEqual(actions[i].text)
  }
})
