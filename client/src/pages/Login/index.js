import React, { Component } from "react";
import { Mutation, withApollo } from "react-apollo";
import gql from "graphql-tag";

import withFullScreenLayout from "./../../layouts/FullScreenLayout";
import LoginView from "./LoginView";

const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      errors {
        path
        message
      }
      session
    }
  }
`;

class Login extends Component {
  onFinish = values => {
    const {
      data: {
        login: { errors }
      }
    } = values;

    const {
      history,
      location: { state },
      client
    } = this.props;

    client.resetStore();

    if (!errors) history.push(state ? state.next : "/");
  };
  render() {
    return (
      <Mutation mutation={LOGIN_MUTATION}>
        {(login, { loading, error, data }) => {
          return (
            <LoginView
              onFinish={this.onFinish}
              login={login}
              error={error}
              data={data}
              loading={loading}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default withFullScreenLayout(withApollo(Login));
