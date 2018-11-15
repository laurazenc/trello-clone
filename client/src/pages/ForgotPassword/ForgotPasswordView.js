import React, { Component } from "react";
import { withFormik, Field } from "formik";
import styled from "styled-components";
import { InputField } from "./../../components/Fields/InputField";
import { Button } from "./../../components/Button";
import { NotificationMessage } from "./../../components/NotificationMessage";

import { emailSchema } from "./../../utils/validations/userSchema";
import { userMessages } from "./../../utils/validations/messages/userMessages";

const Message = styled.div`
  font-size: 24px;
  color: ${props => props.theme.textColor};
  margin-bottom: 30px;
`;

class ForgotPasswordView extends Component {
  render() {
    const { handleSubmit, data, loading } = this.props;

    const successMsg =
      data && !loading && data.forgotPassword ? (
        <NotificationMessage type="success">
          {userMessages.forgotPasswordEmailSent}
        </NotificationMessage>
      ) : null;
    return (
      <form onSubmit={handleSubmit}>
        {data && !loading && !data.forgotPassword ? (
          <NotificationMessage type="error">
            {userMessages.checkEmailAccount}
          </NotificationMessage>
        ) : null}
        {successMsg}
        <Message>{userMessages.forgotPasswordEmail}</Message>
        <Field name="email" placeholder="Email" component={InputField} />
        <Button type="submit">Send email</Button>
      </form>
    );
  }
}

export default withFormik({
  validationSchema: emailSchema,
  mapPropsToValues: () => ({ email: "" }),
  handleSubmit: async (values, { props }) => {
    try {
      const data = await props.forgotPassword({ variables: values });
      if (data) await props.onFinish(data);
    } catch (e) {
      console.log(e);
    }
  }
})(ForgotPasswordView);
