import React, { Component } from "react";
import styled from "styled-components";
import AddList from "./components/AddList";
import EditBoardName from "./components/EditBoardNameForm";

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
  text-transform: uppercase;
  color: ${props => props.theme.textColor};
`;

const ListsContainer = styled.div`
  position: relative;
  width: inherit;
  height: inherit;
  overflow-x: auto;
`;

const ListWrapper = styled.div`
  display: flex;
  position: absolute;
  margin: 24px 0;

  > .list {
    width: 270px;
    height: 100%;
    margin: 0 5px;
    min-height: 90px;
  }
`;

const List = styled.div`
  text-decoration: none;
  min-height: 60px;
  background-color: white;
  border-radius: 3px;
  box-shadow: ${props => props.theme.boxShadowBase};
  display: flex;
  align-items: center;
  padding: 0 24px;
`;

const ListName = styled.div`
  margin: 32px 0;
  color: ${props => props.theme.textColor};
  font-size: 20px;
  font-size: 700;
`;

const BlankList = styled.div`
  border-radius: 3px;
  border: 1px dashed ${props => props.theme.shadowColor};
  display: flex;
  justify-content: center;
  align-items: center;

  i {
    color: ${props => props.theme.shadowColor};
  }

  &:hover {
    background-color: ${props => props.theme.shadowColor};
    border: none;
    cursor: pointer;

    i {
      color: ${props => props.theme.primaryColor};
    }
  }
`;

export default class BoardDetailView extends Component {
  state = {
    isFormVisible: false,
    editingFormName: false
  };
  openForm = () => {
    this.setState({ isFormVisible: true });
  };
  closeForm = () => {
    this.setState({ isFormVisible: false }, () => {
      this.props.refetch();
    });
  };

  startEditing = () => {
    this.setState({ editingFormName: true });
  };
  stopEditing = () => {
    this.setState({ editingFormName: false }, () => {
      this.props.refetch();
    });
  };
  render() {
    const { data, loading } = this.props;

    if (loading || !data) return <div>Loading...</div>;

    const {
      getBoard: { result }
    } = data;
    return (
      <Container>
        <Row>
          {this.state.editingFormName ? (
            <EditBoardName
              value={data.getBoard.result.name}
              stopEditing={this.stopEditing}
              boardId={data.getBoard.result._id}
            />
          ) : (
            <Title onClick={this.startEditing}>
              {data.getBoard.result.name}
            </Title>
          )}
        </Row>

        <ListsContainer>
          <ListWrapper>
            {result.lists.map(list => {
              return (
                <List className="list" key={list._id}>
                  <ListName>{list.name}</ListName>
                </List>
              );
            })}
            {this.state.isFormVisible && (
              <AddList
                className="list"
                boardId={result._id}
                closeForm={this.closeForm}
              />
            )}
            {!this.state.isFormVisible && (
              <BlankList className="list" onClick={this.openForm}>
                <i className="fas fa-plus" />
              </BlankList>
            )}
          </ListWrapper>
        </ListsContainer>
      </Container>
    );
  }
}
