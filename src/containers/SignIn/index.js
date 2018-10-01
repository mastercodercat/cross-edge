import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createStructuredSelector } from 'reselect'
import ImmutablePropTypes from 'react-immutable-proptypes'

import Logo from 'components/Logo'
import SignInForm from 'components/SignInForm'
import { REQUEST_PENDING } from 'constants.js'
import {
  signIn,
  selectAuthData,
} from 'store/modules/auth'
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
    const isSubmitting = auth.state === REQUEST_PENDING

    return (
      <SignInStyleWrapper className="adpSignInPage">
        <div className="adpLoginContentWrapper">
          <div className="adpLoginContent">
            <div className="adpLogoWrapper">
              <Link to="/dashboard">
                <Logo />
              </Link>
            </div>

            <SignInForm
              onSubmit={this.handleLogin}
              submitting={isSubmitting}
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
