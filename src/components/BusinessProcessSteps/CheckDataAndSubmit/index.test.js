import React from 'react'
import { mount } from 'enzyme'

import CheckDataAndSubmit from './index'


it('should render correctly', () => {
  const values = {
    barcodes: ['1000001', '1000002', '1000003', '1000004', '1000005']
  }

  const wrapper = mount(<CheckDataAndSubmit
    values={values}
  />)

  values.barcodes.forEach(barcode => {
    expect(wrapper.text()).toEqual(expect.stringContaining(barcode))
  })
})
