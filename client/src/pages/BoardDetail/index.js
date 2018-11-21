import React, { Component } from "react";
import withMainScreenLayout from "./../../layouts/MainScreenLayout";
import BoardDetailView from "./BoardDetailView";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const GETBOARD_QUERY = gql`
  query getBoard($boardId: String!) {
    getBoard(boardId: $boardId) {
      result {
        _id
        name
        lists {
          _id
          name
          boardId
        }
      }
      errors {
        path
        message
      }
    }
  }
`;

class BoardDetail extends Component {
  render() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    return (
      <Query query={GETBOARD_QUERY} variables={{ boardId: id }}>
        {({ data, loading, refetch }) => {
          return (
            <BoardDetailView data={data} loading={loading} refetch={refetch} />
          );
        }}
      </Query>
    );
  }
}

export default withMainScreenLayout(BoardDetail);
export { GETBOARD_QUERY };
