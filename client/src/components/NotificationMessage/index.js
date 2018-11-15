import React from "react";
import styled from "styled-components";

const NotificationMessageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 35px;
  background-color: ${props =>
    props.type === "success"
      ? props.theme.successBackground
      : props.type === "error"
      ? props.theme.errorBackground
      : props.theme.primaryColor};
  padding: 8px;
  color: ${props => props.theme.textColor};
  border-radius: 3px;
  margin: 15px 0;
  font-size: 16px;
  i {
    color: ${props =>
      props.type === "success"
        ? props.theme.successColor
        : props.type === "error"
        ? props.theme.errorColor
        : props.theme.primaryColor};
    font-size: 14px;
    margin-right: 8px;
    line-height: 30px;
  }
`;

export const NotificationMessage = props => {
  const icon =
    props.type === "success"
      ? "check"
      : props.type === "error"
      ? "times"
      : "information";
  const iconClass = `fas fa-${icon}-circle`;
  return (
    <NotificationMessageContainer {...props}>
      <i className={iconClass} />
      {props.children}
    </NotificationMessageContainer>
  );
};
