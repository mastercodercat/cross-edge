import React from 'react'
import { mount } from 'enzyme'
import { Alert } from 'antd'

import { BusinessProcess } from './index'

import {
  REQUEST_INITIAL,
  REQUEST_SUCCESS,
} from 'constants.js'
import {
  BusinessProcessWizard as BusinessProcessWizardModel,
  BusinessProcessData
} from 'store/modules/businessProcesses'
import { businessProcessWizardData } from 'test/fixtures/bpm'


const props = {
  history: { goBack: jest.fn() },
  match: { params: { name: businessProcessWizardData.name } },
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
  const bp = BusinessProcessWizardModel(businessProcessWizardData)
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

it('should go back history when data submitted with go back option ticked', () => {
  const bp = BusinessProcessWizardModel(businessProcessWizardData)
  const localProps = Object.assign({}, props)
  localProps.businessProcess = BusinessProcessData({
    data: bp,
    state: REQUEST_SUCCESS,
  })
  localProps.submitData = (payload, meta) => meta.onSuccess()

  const wrapper = mount(<BusinessProcess
    {...localProps}
  />)

  wrapper.instance().handleSubmit({
    data: ['111', '112'],
    pack_level: 'Item Level',
    parent: '211',
    go_back_after_submit: true
  })

  expect(localProps.history.goBack).toHaveBeenCalled()
})

it('should reset form when data submitted without go back option ticked', () => {
  const bp = BusinessProcessWizardModel(businessProcessWizardData)
  const localProps = Object.assign({}, props)
  localProps.businessProcess = BusinessProcessData({
    data: bp,
    state: REQUEST_SUCCESS,
  })
  localProps.submitData = (payload, meta) => meta.onSuccess()

  const wrapper = mount(<BusinessProcess
    {...localProps}
  />)

  wrapper.instance().handleSubmit({
    data: ['111', '112'],
    pack_level: 'Item Level',
    parent: '211',
    go_back_after_submit: false
  })

  expect(wrapper.find('tbody tr').length).toEqual(0)
  expect(wrapper.find('button').length).toEqual(2)
})

it('should show error when data submission failed', () => {
  const bp = BusinessProcessWizardModel(businessProcessWizardData)
  const localProps = Object.assign({}, props)
  localProps.businessProcess = BusinessProcessData({
    data: bp,
    state: REQUEST_SUCCESS,
  })
  localProps.submitData = (payload, meta) => meta.onFail()

  const wrapper = mount(<BusinessProcess
    {...localProps}
  />)

  wrapper.instance().handleSubmit({
    data: ['111', '112'],
    pack_level: 'Item Level',
    parent: '211',
    go_back_after_submit: false
  })

  expect(wrapper.text()).toEqual(expect.stringContaining('Failed to submit data'))
})
