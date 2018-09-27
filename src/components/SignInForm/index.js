import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import PropTypes from 'prop-types'

import SignInStyleWrapper from "./style"


export class SignInForm extends Component {

  static propTypes = {
    form: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values)
      }
    })
  }

  render() {
    const { submitting } = this.props
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.handleSubmit}>
        <SignInStyleWrapper className="adpSignInForm">
          <Form.Item className="adpInputWrapper">
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input type="email" placeholder="Email" />
            )}
          </Form.Item>

          <Form.Item className="adpInputWrapper">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input type="password" placeholder="Password" />
            )}
          </Form.Item>

          <div className="adpInputWrapper">
            <div className="adp-flex">
              <div className="adp-flex-right">
                <Button type="primary" htmlType="submit" size="large" disabled={submitting}>
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </SignInStyleWrapper>
      </Form>
    )
  }
}

export default Form.create()(SignInForm)
