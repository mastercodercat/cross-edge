import React from 'react'
import { shallow } from 'enzyme'

import BusinessProcessWizard from './index'

import Wizard from 'components/Wizard'
import {
  BusinessProcessWizard as BusinessProcessWizardData
} from 'store/modules/businessProcesses'
import {
  businessProcessWizardData,
} from 'test/fixtures/bpm'


it('should show business process wizard', () => {
  const bp = BusinessProcessWizardData(businessProcessWizardData)

  const wrapper = shallow(<BusinessProcessWizard
    onSubmit={e => e}
    businessProcess={bp}
  />)

  expect(wrapper.find(Wizard).length).not.toBe(0)
})
