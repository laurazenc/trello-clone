import React, { Component } from "react";
import { withFormik, Field } from "formik";
import styled from "styled-components";

import { InputField } from "./../../components/Fields/InputField";
import { Button } from "./../../components/Button";
import { Divider } from "./../../components/Divider";
import { NotificationMessage } from "./../../components/NotificationMessage";

import { loginSchema } from "./../../utils/validations/userSchema";

import "./login.css";

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;

  a {
    text-decoration: none;
    color: ${props => props.theme.primaryColor};
  }
`;

class LoginView extends Component {
  render() {
    const { handleSubmit, data, state } = this.props;

    const stateMessage = state ? (
      <NotificationMessage type="success">{state}</NotificationMessage>
    ) : null;

    const errorMsg =
      data && data.login.errors && data.login.errors.length ? (
        <NotificationMessage type="error">
          {data.login.errors[0].message}
        </NotificationMessage>
      ) : null;

    return (
      <form className="login-form" onSubmit={handleSubmit}>
        {stateMessage}
        {errorMsg}
        <Field
          name="email"
          size="large"
          placeholder="Email"
          component={InputField}
        />
        <Field
          name="password"
          size="large"
          placeholder="Password"
          component={InputField}
          type="password"
        />

        <Row>
          <a href="/forgot-password">Forgot password ?</a>
          <Button size="small" type="submit">
            Login
          </Button>
        </Row>

        <Divider>or</Divider>

        <Button type="button" icon="github">
          Login with Github
        </Button>

        <Row>
          <a href="/register">Create an account</a>
        </Row>
      </form>
    );
  }
}

export default withFormik({
  validationSchema: loginSchema,
  mapPropsToValues: () => ({ email: "", password: "" }),
  handleSubmit: async (values, { props }) => {
    try {
      const data = await props.login({ variables: values });
      if (data) await props.onFinish(data);
    } catch (e) {
      console.log(e);
    }
  }
})(LoginView);
