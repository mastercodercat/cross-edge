import React from 'react'
import { mount } from 'enzyme'

import CheckDataAndSubmit from './index'


it('should render correctly', () => {
  const values = {
    data: ['1000001', '1000002', '1000003', '1000004', '1000005']
  }

  const wrapper = mount(<CheckDataAndSubmit
    values={values}
    field="data"
  />)

  values.data.forEach(barcode => {
    expect(wrapper.text()).toEqual(expect.stringContaining(barcode))
  })
})
