import React from "react";
import styled from "styled-components";

const DividerWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin: 30px 0;
  color: ${props => props.theme.textColorSecondary};
  position: relative;
  :before {
    content: "";
    width: 45%;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background-image: ${props =>
      `linear-gradient(to right, transparent 33%, ${
        props.theme.borderColorBase
      } 0%)`};
    background-repeat: repeat-x;
    background-position: center;
    background-size: 13px 1px;
    background-repeat: repeat-x;
  }
  :after {
    content: "";
    width: 45%;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    background-image: ${props =>
      `linear-gradient(to right, transparent 33%, ${
        props.theme.borderColorBase
      } 0%)`};
    background-repeat: repeat-x;
    background-position: center;
    background-size: 13px 1px;
    background-repeat: repeat-x;
  }
`;

export const Divider = props => {
  return <DividerWrapper {...props} />;
};
