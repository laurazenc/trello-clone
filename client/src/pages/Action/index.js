import * as React from "react";
import withFullScreen from "./../../layouts/FullScreenLayout";
import styled from "styled-components";
import { userMessages } from "./../../utils/validations/messages/userMessages";
import { Button } from "./../../components/Button";

const Message = styled.div`
  font-size: 24px;
  color: ${props => props.theme.textColor};
  margin-bottom: 30px;
`;

class Action extends React.PureComponent {
  render() {
    const {
      location: { state, pathname }
    } = this.props;

    const isConfirmedAccount = !!(
      pathname.split("/")[2] === "confirmed-account"
    );

    if (isConfirmedAccount) {
      return (
        <div>
          <Message>{userMessages.confirmedAccount}</Message>
          <a href="/login">
            <Button type="button">Login</Button>
          </a>
        </div>
      );
    }
    return (
      <Message>{state && state.message ? state.message : "hello"}</Message>
    );
  }
}

export default withFullScreen(Action);
