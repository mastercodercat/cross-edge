import React from 'react'
import { shallow } from 'enzyme'

import { SignIn } from './index'
import SignInForm from 'components/SignInForm'
import { AuthData } from 'store/modules/auth'


it('should render without errors', () => {
  const wrapper = shallow(
    <SignIn
      auth={AuthData()}
      signIn={e => e}
    />
  )

  expect(wrapper.find(SignInForm).length).toBe(1)
})

it('should call signIn when sign in form submitted', () => {
  const signInMock = jest.fn()

  const wrapper = shallow(
    <SignIn
      auth={AuthData()}
      signIn={signInMock}
    />
  )

  const loginData = {
    email: 'test@test.com',
    password: 'abcde123'
  }

  const signInForm = wrapper.find(SignInForm)
  signInForm.prop('onSubmit')(loginData)
  expect(signInMock).toHaveBeenCalledWith(loginData)
})
