import React, { Component } from 'react'
import { Link } from "react-router-dom"

import Input from "components/uielements/input"
import Checkbox from "components/uielements/checkbox";
import Button from "components/uielements/button";
import SignInStyleWrapper from "./style"


class SignIn extends Component {

  handleLogin = (data) => {
    console.log(data)
  }

  render() {
    return (
      <SignInStyleWrapper className="adpSignInPage">
        <div className="adpLoginContentWrapper">
          <div className="adpLoginContent">
            <div className="adpLogoWrapper">
              <Link to="/dashboard">
                Sign In
              </Link>
            </div>

            <div className="adpSignInForm">
              <div className="adpInputWrapper">
                <Input size="large" placeholder="Username" />
              </div>

              <div className="adpInputWrapper">
                <Input size="large" type="password" placeholder="Password" />
              </div>

              <div className="adpInputWrapper adpLeftRightComponent">
                <Checkbox>
                  Remember me
                </Checkbox>
                <Button type="primary" onClick={this.handleLogin}>
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    )
  }
}

export default SignIn
