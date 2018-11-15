import React, { Component } from "react";
import { withFormik, Field } from "formik";
import styled from "styled-components";
import { InputField } from "../../components/Fields/InputField";
import { Button } from "../../components/Button";
import { NotificationMessage } from "../../components/NotificationMessage";

import { changePasswordSchema } from "../../utils/validations/userSchema";
import { userMessages } from "../../utils/validations/messages/userMessages";

const Message = styled.div`
  font-size: 24px;
  color: ${props => props.theme.textColor};
  margin-bottom: 30px;
`;

class ChangePasswordView extends Component {
  render() {
    const { handleSubmit, data } = this.props;

    const errorMsg =
      data && data.changePassword && data.changePassword.errors ? (
        <NotificationMessage type="error">
          {data.changePassword.errors[0].message}
        </NotificationMessage>
      ) : null;
    return (
      <form onSubmit={handleSubmit}>
        {errorMsg}
        <Message>{userMessages.changeYourPassword}</Message>
        <Field
          type="password"
          name="newPassword"
          placeholder="New Password"
          component={InputField}
        />
        <Button type="submit">Change password</Button>
      </form>
    );
  }
}

export default withFormik({
  validationSchema: changePasswordSchema,
  mapPropsToValues: () => ({ newPassword: "" }),
  handleSubmit: async (values, { props }) => {
    const { token, changePassword, onFinish } = props;
    try {
      const data = await changePassword({
        variables: { newPassword: values.newPassword, key: token }
      });
      if (data) await onFinish(data);
    } catch (e) {
      console.log(e);
    }
  }
})(ChangePasswordView);
