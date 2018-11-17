import React from "react";
import styled from "styled-components";
import { Button } from "./../../Button";

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

export const NoBoards = props => {
  return (
    <Container>
      <i className="far fa-folder-open" />
      <h1>Looks like you don't have any Boards</h1>
      <h3>Let's create a new one!</h3>
      <Button size="small" type="button" onClick={props.openForm}>
        New Board
      </Button>
    </Container>
  );
};
