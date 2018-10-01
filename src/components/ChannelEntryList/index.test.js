import React from 'react'
import { mount } from 'enzyme'

import ChannelEntryList from './index'
import { ChannelEntry, ChannelEntrySubRecord } from 'store/modules/channels'
import { mockPagination } from 'test/helpers'
import channelEntryListMock from 'test/fixtures/channelEntries'


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
  const actions = [
    { text: 'Edit', handler: e => e },
    { text: 'Delete', handler: e => e },
  ]

  const wrapper = mount(<ChannelEntryList
    loading={false}
    channelEntries={channelEntryListMock.toArray()}
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
