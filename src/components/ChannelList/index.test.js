import React from 'react'
import { mount } from 'enzyme'

import ChannelList from './index'
import { mockPagination } from 'utils/test-helpers'
import { Channel } from 'store/modules/channels'


it('should show spinner when data not loaded', () => {
  const wrapper = mount(<ChannelList
    loading
    channels={[]}
    actions={[]}
    rowClassName={e => ''}
  />)

  expect(wrapper.find('.ant-spin')).not.toBeNull()
})

it('should display data records with actions when data loaded', () => {
  const channels = [
    Channel({
      id: 1,
      name: "Chuck Channel",
      description: "Test Channel",
      gln: "12345",
      url: "http://chucksailer.com",
      address_1: "Address1",
      address_2: "Address2",
      city: "Phila",
      state: "PA",
      country: "USA",
      postal_code: "12345",
      time_zone_offset: -5
    }),
    Channel({
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
    })
  ]

  const wrapper = mount(<ChannelList
    loading={false}
    channels={channels}
    rowClassName={() => 'data-row'}
    onClickColumn={e => e}
    onClickEntries={e => e}
  />)

  expect(wrapper.find('tbody tr.data-row')).toHaveLength(2)
})
