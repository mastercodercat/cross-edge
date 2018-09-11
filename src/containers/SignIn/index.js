import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import SignInForm from 'components/SignInForm'
import { signIn } from 'store/modules/auth'
import SignInStyleWrapper from "./style"


class SignIn extends Component {

  static propTypes = {
    signIn: PropTypes.func.isRequired,
  }

  handleLogin = (data) => {
    this.props.signIn(data)
  }

  render() {
    return (
      <SignInStyleWrapper className="adpSignInPage">
        <div className="adpLoginContentWrapper">
          <div className="adpLoginContent">
            <div className="adpLogoWrapper">
              <Link to="/dashboard">
                Adept Packaging
              </Link>
            </div>

            <SignInForm onSubmit={this.handleLogin} />
          </div>
        </div>
      </SignInStyleWrapper>
    )
  }
}

const actions = {
  signIn,
}

export default compose(
  connect(null, actions)
)(SignIn)
