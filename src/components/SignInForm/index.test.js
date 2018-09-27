import React from 'react'
import { mount } from 'enzyme'

import SignInForm from './index'
import { changeInputValue } from 'utils/test-helpers'


it('should render sign in form', () => {
  let submittedData = null
  const wrapper = mount(<SignInForm
    onSubmit={data => submittedData = data}
    submitting={false}
  />)

  expect(wrapper.find('form').length).toBe(1)
})

it('should submit entered data', () => {
  const formData = {
    email: 'test@test.com',
    password: 'abcde123',
  }

  let submittedData = null
  const wrapper = mount(<SignInForm
    onSubmit={data => submittedData = data}
    submitting={false}
  />)

  changeInputValue(wrapper.find('input[type="email"]'), formData.email)
  changeInputValue(wrapper.find('input[type="password"]'), formData.password)
  wrapper.find('form').simulate('submit', { preventDefault: jest.fn() })

  expect(submittedData).toEqual(formData)
})

it('should not submit when validation fails', () => {
  const formData = {
    email: 'test@test.com',
    password: 'abcde123',
  }

  let submittedData = null
  const onSubmitMock = jest.fn()
  const wrapper = mount(<SignInForm
    onSubmit={onSubmitMock}
    submitting={false}
  />)

  console.warn = jest.fn()

  changeInputValue(wrapper.find('input[type="email"]'), '')
  changeInputValue(wrapper.find('input[type="password"]'), formData.password)
  wrapper.find('form').simulate('submit', { preventDefault: jest.fn() })

  expect(onSubmitMock.mock.called).not.toBeTruthy()

  changeInputValue(wrapper.find('input[type="email"]'), formData.email)
  changeInputValue(wrapper.find('input[type="password"]'), '')
  wrapper.find('form').simulate('submit', { preventDefault: jest.fn() })

  expect(onSubmitMock.mock.called).not.toBeTruthy()
})
