import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import withFullScreenLayout from "./../../layouts/FullScreenLayout";
import ForgotPasswordView from "./ForgotPasswordView";

const FORGOTPASSWORD_MUTATION = gql`
  mutation FORGOTPASSWORD_MUTATION($email: String!) {
    forgotPassword(email: $email)
  }
`;

class ForgotPassword extends Component {
  onFinish = values => {};
  render() {
    return (
      <Mutation mutation={FORGOTPASSWORD_MUTATION}>
        {(forgotPassword, { loading, error, data }) => {
          return (
            <ForgotPasswordView
              onFinish={this.onFinish}
              data={data}
              loading={loading}
              forgotPassword={forgotPassword}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default withFullScreenLayout(ForgotPassword);
