/* eslint-disable */
import React, { useState } from 'react';
import SEO from "../../components/common/seo"
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo'
import ConnexionLayout from "../../components/account/ConnexionLayout"
import { navigate } from 'gatsby'
import Preloader from "../../components/common/preloader"

const CUSTOMER_REGISTER = gql`
mutation customerCreate($input: CustomerCreateInput!) {
  customerCreate(input: $input) {
    customer {
      id
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}
`

const RegisterForm = () => {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);

  return (
    <>
      <Preloader />
      <div className="page-width">
        <div className="grid">
          <div className="grid__item medium-up--one-half medium-up--push-one-quarter login-secton_wrapper">
            <div className="form-vertical" id="CustomerLoginForm">
              <div className="identificationHeading_wrapper">
                <span id="LoginIDHeading">CREATE NEW ACCOUNT</span>
              </div>

              <span className="register-subheader">LOGIN INFORMATION</span>

              <Mutation mutation={CUSTOMER_REGISTER}>
                {(customerLogin) => {
                  return (
                    <>
                      <div id="RegisterForm">
                        <label className="label has-text-white" htmlFor="loginEmail">Email</label>
                        <input className="input" type="email" id="loginEmail" onChange={(e) => setEmail(e.target.value)} />

                        <label className="label has-text-white" htmlFor="loginPassword">Password</label>
                        <input className="input" type="password" id="loginPassword" onChange={(e) => (setPassword(e.target.value))} />

                        <span className="register-subheader">PERSONAL DETAILS</span>

                        <br></br>
                        <br></br>
                        
                        <label className="label has-text-white" htmlFor="first_name">First Name</label>
                        <input className="input" type="first_name" id="first_name" onChange={(e) => (setFirstName(e.target.value))} />

                        <label className="label has-text-white" htmlFor="last_name">Last Name</label>
                        <input className="input" type="last_name" id="last_name" onChange={(e) => (setLastName(e.target.value))} />
  
                        <button
                          className="register-account_btn btn"
                          onClick={() => {
                            customerLogin({
                              variables: {
                                "input": {
                                  "email": email,
                                  "password": password,
                                  "firstName": first_name,
                                  "lastName": last_name,
                                }
                              }
                            }).then((result) => {
                              navigate(`/account/login`)
                            })
                          }}
                        >CREATE</button>
                      </div>
                    </>
                  )
                }}
              </Mutation>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};



const Register = () => {
  return (
    <>
      <SEO title="Register" />
      <ConnexionLayout log={false}>
        <RegisterForm />
      </ConnexionLayout>
    </>
  );
};

export default Register;

