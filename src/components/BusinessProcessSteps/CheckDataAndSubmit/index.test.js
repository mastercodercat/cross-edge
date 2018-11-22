import React from 'react'
import { mount } from 'enzyme'

import CheckDataAndSubmit from './index'

import { businessProcessWizardData } from 'test/fixtures/bpm'


it('should render correctly', () => {
  const values = {
    data: ['1000001', '1000002', '1000003', '1000004', '1000005'],
    pack_level: 'Item Level',
    parent: '2000001',
  }

  const wrapper = mount(<CheckDataAndSubmit
    values={values}
    steps={businessProcessWizardData.markup.steps}
  />)

  values.data.forEach(barcode => {
    expect(wrapper.text()).toEqual(expect.stringContaining(barcode))
  })
})
