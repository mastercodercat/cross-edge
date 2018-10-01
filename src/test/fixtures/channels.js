import Immutable from 'immutable'

import { Channel } from 'store/modules/channels'


export default Immutable.List([
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
  }),
])
