import React, { Component } from "react";
import { withFormik, Field } from "formik";
import styled from "styled-components";

import { InputField } from "./../../components/Fields/InputField";
import { Button } from "./../../components/Button";
import { Divider } from "./../../components/Divider";

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

const ErrorMessage = styled.div`
  height: 35px;
  background-color: ${props => props.theme.erroBackground};
  line-height: 35px;
  padding: 0 8px;
  color: ${props => props.theme.errorColor};
  border-radius: 3px;

  i {
    color: ${props => props.theme.errorColor};
    font-size: 14px;
    margin-right: 8px;
    line-height: 30px;
  }
`;

class LoginView extends Component {
  render() {
    const { handleSubmit, data } = this.props;

    const errorMsg =
      data && data.login.errors && data.login.errors.length ? (
        <ErrorMessage>
          <i className="fas fa-times-circle" />
          {data.login.errors[0].message}
        </ErrorMessage>
      ) : null;

    return (
      <form className="login-form" onSubmit={handleSubmit}>
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
