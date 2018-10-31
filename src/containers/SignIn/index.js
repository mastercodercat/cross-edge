import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createStructuredSelector } from 'reselect'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Alert } from 'antd'

import Logo from 'components/Logo'
import SignInForm from 'components/SignInForm'
import {
  signIn,
  selectAuthData,
} from 'store/modules/auth'
import { isPending, hasFailed } from 'utils/state-helpers'
import SignInStyleWrapper from "./style"


export class SignIn extends Component {

  static propTypes = {
    auth: ImmutablePropTypes.record.isRequired,
    signIn: PropTypes.func.isRequired,
  }

  handleLogin = (data) => {
    this.props.signIn(data)
  }

  render() {
    const { auth } = this.props

    return (
      <SignInStyleWrapper className="adpSignInPage">
        <div className="adpLoginContentWrapper">
          <div className="adpLoginContent">
            <div className="adpLogoWrapper">
              <Link to="/dashboard">
                <Logo />
              </Link>
            </div>

            {
              hasFailed(auth.state) &&
              <div className="alertWrapper">
                <Alert message="Failed to login with provided credentials" type="error" />
              </div>
            }

            <SignInForm
              onSubmit={this.handleLogin}
              submitting={isPending(auth.state)}
            />
          </div>
        </div>
      </SignInStyleWrapper>
    )
  }
}

const selector = createStructuredSelector({
  auth: selectAuthData,
})

const actions = {
  signIn,
}

export default compose(
  connect(selector, actions)
)(SignIn)
