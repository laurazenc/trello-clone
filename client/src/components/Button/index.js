import React from "react";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  min-width: 150px;
  width: ${props => (props.size && props.size === "small" ? "150px" : "100%")};
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

  &:hover {
    cursor: pointer;
    box-shadow: 0px 5px 8px 0px ${props => props.theme.shadowColor};
  }

  &:visited,
  &:focus {
    outline: 0;
  }
`;

const Icon = styled.div`
  width: 40px;
  height: 100%;
  position: absolute;
  left: 0;
  border-radius: 3px 0 0 3px;
  background-color: #3f74e7;
  display: flex;
  justify-content: center;
  align-items: center;

  i {
    color: white;
    font-size: 20px;
  }
`;

export const Button = props => {
  const { size, icon, ...rest } = props;
  const preffix = icon ? (
    <Icon>
      <i className="fab fa-github" />
    </Icon>
  ) : null;
  return (
    <ButtonWrapper size={size}>
      {preffix}
      <Btn {...rest} />
    </ButtonWrapper>
  );
};
