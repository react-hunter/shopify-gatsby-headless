import React, { useState, useContext } from 'react';
import { Link } from 'gatsby'
import SEO from "../../components/seo"
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo'
import StoreContext from '../../context/store'
import ConnexionLayout from "../../components/account/ConnexionLayout"

const CUSTOMER_LOGIN = gql`
mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
  customerAccessTokenCreate(input: $input) {
    customerAccessToken {
      accessToken
      expiresAt
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}
`

const CUSTOMER_PASSWORD_RESET = gql`
mutation customerRecover($email: String!) {
  customerRecover(email: $email) {
    customerUserErrors {
      code
      field
      message
    }
  }
}
`

const LoginForm = () => {
  const { setValue } = useContext(StoreContext);
  const [passwordForgot, setPasswordForgot] = useState(false);

  const [email, setEmail] = useState("");
  const [emailReset, setEmailReset] = useState("");

  const [messsageInfo, setMessageInfo] = useState("");


  const [password, setPassword] = useState(null);
  const handleCustomerAccessToken = (value) => {
    setValue(value)
  }

  return (
    <>
      <div className="page-width">
        <div className="grid">
          <div className="grid__item medium-up--one-half medium-up--push-one-quarter login-secton_wrapper">
            <div className="form-vertical" id="CustomerLoginForm">
              <div className="identificationHeading_wrapper">
                <span id="LoginIDHeading">IDENTIFICATION</span>
              </div>

              {passwordForgot ?
                <div className="forgot-password_section">
                  <span className="register-subheader">CHANGE YOUR PASSWORD</span>
                  <p className="forgot-password_description">In order to reset your password, please provide us your email. We will send you an email momentarily.</p>
                  
                  <Mutation mutation={CUSTOMER_PASSWORD_RESET}>
                    {(customerRecover) => {
                      return (
                        <>
                          <label className="forgot-password_email_field" htmlFor="loginEmail">Login*</label>
                          <input className="input" type="email" id="loginEmail" onChange={(e) => setEmailReset(e.target.value)} />

                          <div className="forgot-password_button_wrapper">
                            <div className="forgot-password_cancel_btn" role="button" tabIndex="0" 
                              onClick={() => setPasswordForgot(!passwordForgot)} onKeyDown={() => () => setPasswordForgot(!passwordForgot)}>
                              Cancel
                            </div>

                            <button
                              className="forgot-password_send_btn"
                              onClick={() => {
                                customerRecover({
                                  variables: {
                                    "email": emailReset,
                                  }
                                }).then(() => {
                                  setMessageInfo("We've sent you an email with a link to update your password.")
                                  setPasswordForgot(false)
                                })
                              }}>Send</button>
                          </div>
                        </>
                      )
                    }}
                  </Mutation>
                </div>
                :
                <div>
                  {messsageInfo &&
                    <div className="form-message form-message--success hide" id="ResetSuccess" tabindex="-1">
                      {messsageInfo}
                    </div>
                  }

                  <Mutation mutation={CUSTOMER_LOGIN}>
                    {(customerLogin) => {
                      return (
                        <>
                          <div className="login-main_container">
                            <span id="LoginHeading" className="text-center">MEMBERS PLEASE SIGN IN</span>

                            <div id="customer_login">
                              <label className="input-type_header" htmlFor="loginEmail">Login*</label>
                              <input className="input" type="email" id="loginEmail" onChange={(e) => setEmail(e.target.value)} />

                              <label className="input-type_header" htmlFor="loginPassword">Password*</label>
                              <input className="input" type="password" id="loginPassword" onChange={(e) => (setPassword(e.target.value))} />

                              <div className="control has-text-centered" role="button" tabIndex="0" onClick={() => setPasswordForgot(!passwordForgot)} onKeyDown={() => setPasswordForgot(!passwordForgot)}>
                                <p id="RecoverPassword">Forgot your password? </p>
                              </div>

                              <div className="login-button_wrapper">
                                  <button
                                    className="btn"
                                    onClick={() => {
                                      customerLogin({
                                        variables: {
                                          "input": {
                                            "email": email,
                                            "password": password,
                                          }
                                        }
                                      }).then((result) => {
                                        handleCustomerAccessToken(result.data.customerAccessTokenCreate.customerAccessToken)
                                      }).catch((err) => {
                                        alert(err)
                                      })
                                    }}
                                  >SIGN IN</button>
                              </div>

                            </div>
                          </div>
                        </>
                      )
                    }}
                  </Mutation>
                </div>
              }

              <div className="login-register-account_section">
                <span className="login-register-account_header">DON'T HAVE AN ACCOUNT</span>
                <p className="login-register-account_content_message">
                  Enjoy added benefits and richer experience by creating a personal account.
                </p>
                <Link to="/../account/register" id="customer_register_link">Create account</Link>
              </div>

            </div>
          </div>
        </div>        
      </div>
    </>
  );
};


const Login = () => {
  return (
    <>
      <SEO title="Login" />
      <ConnexionLayout log={false}>
        <LoginForm />
      </ConnexionLayout>
    </>
  );
};

export default Login;

