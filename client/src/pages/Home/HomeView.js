import React, { Component } from "react";
import styled from "styled-components";

import { NoBoards } from "./../../components/EmptyState/NoBoards";
import { Button } from "./../../components/Button";
import CreateBoardForm from "./components/CreateBoardForm";

const Container = styled.div`
  width: inherit;
  height: inherit;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-size: 20px;
  color: ${props => props.theme.textColor};
`;

const BoardList = styled.div`
  position: relative;
  margin: 24px 0;
  display: grid;
  justify-content: flex-start;
  grid-template-columns:
    repeat(auto-fill, 25%)
    25%;
  grid-gap: 1rem;
`;

const BoardCard = styled.a`
  text-decoration: none;
  min-height: 60px;
  background-color: white;
  border-radius: 3px;
  box-shadow: ${props => props.theme.boxShadowBase};
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 24px;

  h3 {
    color: ${props => props.theme.textColor};
  }

  &:hover {
    border: 1px solid transparent;
    box-shadow: ${props => props.theme.focusShadow};
    cursor: pointer;
  }
`;

export default class HomeView extends Component {
  state = {
    showCreateBoardForm: false
  };

  openForm = () => {
    this.setState({ showCreateBoardForm: true });
  };

  closeForm = () => {
    this.setState({ showCreateBoardForm: false }, () => {
      this.props.refetch();
    });
  };

  render() {
    const { data, loading } = this.props;
    return (
      <Container>
        <Row>
          <Title>My Boards</Title>
          <Button size="small" onClick={this.openForm}>
            Create Board
          </Button>
        </Row>
        {loading && <div>Loading...</div>}
        {!loading && !data.getUsersBoards.length && (
          <NoBoards openForm={this.openForm} />
        )}

        {!loading && data.getUsersBoards.length > 0 && (
          <BoardList>
            {data.getUsersBoards.map(board => {
              return (
                <BoardCard href={`/board/${board._id}`} key={board._id}>
                  <h3>{board.name}</h3>
                </BoardCard>
              );
            })}
          </BoardList>
        )}

        {this.state.showCreateBoardForm && (
          <CreateBoardForm closeForm={this.closeForm} />
        )}
      </Container>
    );
  }
}
