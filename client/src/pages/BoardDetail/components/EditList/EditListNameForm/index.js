import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import EditListForm from "./FormView";

const EDITLIST_MUTATION = gql`
  mutation EDITLIST_MUTATION($id: String!, $name: String!) {
    editList(id: $id, name: $name) {
      result
      errors {
        path
        message
      }
    }
  }
`;

class EditListName extends Component {
  onFinish = values => {
    const {
      data: {
        editList: { errors }
      }
    } = values;

    if (errors) return null;

    this.props.saveListName();
  };
  render() {
    const { value, listId } = this.props;
    return (
      <Mutation mutation={EDITLIST_MUTATION}>
        {(editList, { data, loading }) => {
          return (
            <EditListForm
              onFinish={this.onFinish}
              editList={editList}
              data={data}
              loading={loading}
              value={value}
              token={listId}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default EditListName;
