import React from 'react'
import { mount } from 'enzyme'

import ChannelEntryList from './index'
import { mockPagination } from 'utils/test-helpers'


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
    { serial_number: 'DHYUD11001', ship_date: '2018-10-01' },
    { serial_number: 'DHYUD11002', ship_date: '2018-10-02' },
    { serial_number: 'DHYUD11010', ship_date: '2018-10-03' },
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

  expect(wrapper.find('tr')).toHaveLength(3 + 1)

  const actionCell = wrapper.find('tr').at(1).find('td').at(2)

  expect(actionCell.find('a')).toHaveLength(2)
  for (let i = 0; i < actions.length; i += 1) {
    expect(actionCell.childAt(i).text()).toEqual(actions[i].text)
  }
})
