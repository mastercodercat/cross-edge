import React from 'react'
import { mount } from 'enzyme'

import { BusinessProcess } from './index'

import {
  REQUEST_INITIAL,
  REQUEST_SUCCESS,
} from 'constants.js'
import {
  BusinessProcess as BusinessProcessModel,
  BusinessProcessData
} from 'store/modules/BusinessProcesses'
import { businessProcesses } from 'test/fixtures/bpm'


const props = {
  match: { params: { name: businessProcesses[0].name } },
  businessProcess: BusinessProcessData(),
  submitDataState: REQUEST_INITIAL,
  loadBusinessProcess: jest.fn(),
  submitData: jest.fn(),
}

it('should show spinner when business process not loaded', () => {
  const wrapper = mount(<BusinessProcess
    {...props}
  />)

  expect(wrapper.find('.ant-spin')).not.toBeNull()
  expect(props.loadBusinessProcess.mock.calls).toBeTruthy()
})

it('should show business process wizard when loaded', () => {
  const bp = BusinessProcessModel(businessProcesses[0])
  const localProps = Object.assign({}, props)
  localProps.businessProcess = BusinessProcessData({
    data: bp,
    state: REQUEST_SUCCESS,
  })

  const wrapper = mount(<BusinessProcess
    {...localProps}
  />)

  expect(wrapper.text()).toEqual(expect.stringContaining(bp.name))
  expect(wrapper.find('form')).not.toBeNull()
  expect(wrapper.find('.wizardButtons')).not.toBeNull()
})
