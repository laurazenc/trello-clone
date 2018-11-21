import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import EditBoardForm from "./FormView";

const EDIT_MUTATION = gql`
  mutation EDIT_MUTATION($id: String!, $name: String!) {
    editBoard(id: $id, name: $name) {
      result
      errors {
        path
        message
      }
    }
  }
`;

class EditBoardName extends Component {
  onFinish = values => {
    const {
      data: {
        editBoard: { errors }
      }
    } = values;

    if (errors) return null;

    this.props.stopEditing();
  };
  render() {
    const { value, boardId } = this.props;
    return (
      <Mutation mutation={EDIT_MUTATION}>
        {(editBoard, { data, loading }) => {
          return (
            <EditBoardForm
              onFinish={this.onFinish}
              editBoard={editBoard}
              data={data}
              loading={loading}
              stopEditing={this.props.stopEditing}
              value={value}
              token={boardId}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default EditBoardName;
