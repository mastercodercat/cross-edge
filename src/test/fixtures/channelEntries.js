import Immutable from 'immutable'

import { ChannelEntry, ChannelEntrySubRecord } from 'store/modules/channels'


export default Immutable.List([
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
])
