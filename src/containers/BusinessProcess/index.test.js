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
} from 'store/modules/businessProcesses'
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

  expect(wrapper.find('.ant-spin').length).not.toEqual(0)
  expect(props.loadBusinessProcess.mock.calls).toBeTruthy()
})

it('should show business process wizard when loaded', () => {
  const bp = BusinessProcessModel(businessProcesses[1])
  const localProps = Object.assign({}, props)
  localProps.businessProcess = BusinessProcessData({
    data: bp,
    state: REQUEST_SUCCESS,
  })

  const wrapper = mount(<BusinessProcess
    {...localProps}
  />)

  expect(wrapper.text()).toEqual(expect.stringContaining(bp.name))
  expect(wrapper.find('form').length).not.toBe(0)
  expect(wrapper.find('.wizardButtons')).not.toBe(0)
})

it('should show error messages when wizard not defined for the name', () => {
  const bp = BusinessProcessModel(businessProcesses[0])
  const localProps = Object.assign({}, props)
  localProps.businessProcess = BusinessProcessData({
    data: bp,
    state: REQUEST_SUCCESS,
  })

  const wrapper = mount(<BusinessProcess
    {...localProps}
  />)

  expect(wrapper.text()).toEqual(expect.stringContaining('Invalid business process name'))
})
