import React, { Component } from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { GETBOARD_QUERY } from "./../../../index";

const ListItem = styled.li`
  position: relative;
  padding: 16px;
  display: block;
  min-height: 50px;
  color: ${props => props.theme.secondaryTextColor};
  font-size: 14px;
  font-weight: 500;

  .menu-list-item {
    display: flex;
    width: 100%;
    align-items: center;
    .delete-message {
      &:hover {
        cursor: pointer;
      }
    }
  }

  i {
    margin-right: 8px;
  }

  .warning-message-wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .icons-wrapper {
      display: flex;
      i.fa-times-circle {
        color: ${props => props.theme.errorColor};
      }
      i.fa-check-circle {
        color: ${props => props.theme.successBackground};
      }
    }
  }
`;

const DELETE_LIST_FROM_BOARD_MUTATION = gql`
  mutation DELETE_LIST_FROM_BOARD_MUTATION($id: String!) {
    deleteList(id: $id) {
      errors {
        path
        message
      }
      result
    }
  }
`;

export default class DeleteItemList extends Component {
  render() {
    const { id, boardId } = this.props;
    return (
      <Mutation
        mutation={DELETE_LIST_FROM_BOARD_MUTATION}
        variables={{ id }}
        refetchQueries={[{ query: GETBOARD_QUERY, variables: { boardId } }]}
      >
        {(deleteList, { data, error, loading }) => {
          return (
            <ListItem>
              <div
                className="menu-list-item"
                disabled={loading}
                onClick={deleteList}
              >
                <i className="far fa-trash-alt" />
                <div className="delete-message">Delete</div>
              </div>
            </ListItem>
          );
        }}
      </Mutation>
    );
  }
}
