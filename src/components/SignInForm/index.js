import React, { Component } from 'react'
import { Form } from 'antd'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

import Input from "components/uielements/input"
import Button from "components/uielements/button";
import SignInStyleWrapper from "./style"


class SignInForm extends Component {

  static propTypes = {
    form: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValues: ImmutablePropTypes.map,
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
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.handleSubmit}>
        <SignInStyleWrapper className="adpSignInForm">
          <Form.Item className="adpInputWrapper">
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input size="large" type="email" placeholder="Email" />
            )}
          </Form.Item>

          <Form.Item className="adpInputWrapper">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input size="large" type="password" placeholder="Password" />
            )}
          </Form.Item>

          <div className="adpInputWrapper adpCenterComponent">
            <Button type="primary" htmlType="submit">
              Sign In
            </Button>
          </div>
        </SignInStyleWrapper>
      </Form>
    )
  }
}

export default Form.create()(SignInForm)
