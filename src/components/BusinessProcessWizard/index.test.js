import React from 'react'
import { shallow } from 'enzyme'

import BusinessProcessWizard from './index'

import Wizard from 'components/Wizard'
import { BusinessProcess } from 'store/modules/businessProcesses'
import {
  businessProcesses,
  nonExistingBusinessProcesses,
} from 'test/fixtures/bpm'


it('should show business process wizard', () => {
  const bp = BusinessProcess(businessProcesses[1])

  const wrapper = shallow(<BusinessProcessWizard
    onSubmit={e => e}
    businessProcess={bp}
  />)

  expect(wrapper.find(Wizard).length).not.toBe(0)
})
