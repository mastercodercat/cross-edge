import React from 'react'
import { shallow } from 'enzyme'

import BusinessProcessWizard from './index'
import Commissioning from './Commissioning'

import { BusinessProcess } from 'store/modules/BusinessProcesses'
import {
  businessProcesses,
  nonExistingBusinessProcesses,
} from 'test/fixtures/bpm'


it('should show business process wizard for available types', () => {
  const bp = BusinessProcess(businessProcesses[1])

  const wrapper = shallow(<BusinessProcessWizard
    businessProcess={bp}
  />)

  expect(wrapper.find(Commissioning).length).not.toBe(0)
})

it('should show error message for unavailable types', () => {
  const bp = BusinessProcess(nonExistingBusinessProcesses)

  const wrapper = shallow(<BusinessProcessWizard
    businessProcess={bp}
  />)

  expect(wrapper.text()).toEqual(expect.stringContaining('Invalid business process name'))
})
