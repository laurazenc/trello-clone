import React, { Component } from "react";
import { withFormik, Field } from "formik";
import styled from "styled-components";

import { InputField } from "../../components/Fields/InputField";
import { Button } from "../../components/Button";

import { validUserSchema } from "../../utils/validations/userSchema";

import "./register.css";

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
  background-color: ${props => props.theme.errorBackground};
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

class RegisterView extends Component {
  render() {
    const { handleSubmit, data } = this.props;

    const errorMsg =
      data && data.register.errors && data.register.errors.length ? (
        <ErrorMessage>
          <i className="fas fa-times-circle" />
          {data.register.errors[0].message}
        </ErrorMessage>
      ) : null;

    return (
      <form className="register-form" onSubmit={handleSubmit}>
        {errorMsg}
        <Field
          name="email"
          size="large"
          placeholder="Email"
          component={InputField}
        />
        <Field
          name="displayName"
          size="large"
          placeholder="Display name"
          component={InputField}
        />
        <Field
          name="password"
          size="large"
          placeholder="Password"
          component={InputField}
          type="password"
        />
        <Field
          name="confirmPassword"
          size="large"
          placeholder="Confirm Password"
          component={InputField}
          type="password"
        />

        <Row>
          <a href="/login">Already have an account ? Login</a>
          <Button size="small" type="submit">
            Create account
          </Button>
        </Row>
      </form>
    );
  }
}

export default withFormik({
  validationSchema: validUserSchema,
  mapPropsToValues: () => ({
    email: "",
    displayName: "",
    password: "",
    confirmPassword: ""
  }),
  handleSubmit: async (values, { props }) => {
    try {
      const data = await props.register({ variables: values });
      if (data) await props.onFinish(data);
    } catch (e) {
      console.log(e);
    }
  }
})(RegisterView);
