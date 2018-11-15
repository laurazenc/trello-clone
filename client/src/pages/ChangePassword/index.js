import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import withFullScreenLayout from "./../../layouts/FullScreenLayout";
import ChangePasswordView from "./ChangePasswordView";
import { userMessages } from "../../utils/validations/messages/userMessages";

const CHANGEPASSWORD_MUTATION = gql`
  mutation CHANGEPASSWORD_MUTATION($newPassword: String!, $key: String!) {
    changePassword(newPassword: $newPassword, key: $key) {
      errors {
        path
        message
      }
      result
    }
  }
`;

class ForgotPassword extends Component {
  onFinish = values => {
    const {
      data: {
        changePassword: { errors, result }
      }
    } = values;

    if (errors) return null;
    if (result) {
      const { history } = this.props;
      history.push("/login", { message: userMessages.passwordUpdated });
    }
  };
  render() {
    const {
      match: {
        params: { key }
      }
    } = this.props;
    return (
      <Mutation mutation={CHANGEPASSWORD_MUTATION}>
        {(changePassword, { loading, error, data }) => {
          return (
            <ChangePasswordView
              onFinish={this.onFinish}
              data={data}
              token={key}
              loading={loading}
              changePassword={changePassword}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default withFullScreenLayout(ForgotPassword);
