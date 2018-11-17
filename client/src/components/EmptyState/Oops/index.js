import React from "react";
import styled from "styled-components";
import { Button } from "./../../Button";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  i {
    color: ${props => props.theme.iconColor};
    font-size: 15rem;
  }

  h1 {
    color: ${props => props.theme.primaryColor};
    margin-bottom: 10px;
  }

  h3 {
    color: ${props => props.theme.secondaryTextColor};
    margin: 0 0 50px;
  }
`;

export const Oops = props => {
  return (
    <Container>
      <i className="far fa-compass" />
      <h1>404 Not found</h1>
      <h3>The page you are trying to access to does not exist!</h3>
      <Button size="small" type="button">
        <Link to="/">Go back</Link>
      </Button>
    </Container>
  );
};
