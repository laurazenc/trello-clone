import React from "react";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  width: 40px;
  position: relative;
  height: 40px;
`;

const Btn = styled.button`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.primaryColor};
  color: white;
  text-transform: uppercase;
  font-weight: 600;
  border: none;
  font-size: 14px;
  border-radius: 3px;
  box-shadow: 0px 6px 15px 2px ${props => props.theme.shadowColor};

  a {
    color: white;
    text-decoration: none;
  }

  &:hover {
    cursor: pointer;
    box-shadow: 0px 5px 8px 0px ${props => props.theme.shadowColor};
  }

  &:visited,
  &:focus {
    outline: 0;
  }

  i {
    color: white;
    font-size: 20px;
  }
`;

export const IconButton = props => {
  const { onClick, ...rest } = props;
  return (
    <ButtonWrapper className="icon-button-wrapper">
      <Btn onClick={onClick} {...rest}>
        <i className="fas fa-plus" />
      </Btn>
    </ButtonWrapper>
  );
};
