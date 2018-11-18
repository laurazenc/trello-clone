import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import AddListForm from "./AddListForm";

const ADDLIST_MUTATION = gql`
  mutation ADDLIST_MUTATION($name: String!, $boardId: String!) {
    createList(name: $name, boardId: $boardId) {
      errors {
        path
        message
      }
      result
    }
  }
`;

export default class AddList extends Component {
  onFinish = values => {
    const {
      data: {
        createList: { errors }
      }
    } = values;

    if (errors) return null;

    this.props.closeForm();
  };

  render() {
    const { closeForm, boardId } = this.props;

    return (
      <Mutation mutation={ADDLIST_MUTATION}>
        {(createList, { data, loading }) => {
          return (
            <AddListForm
              createList={createList}
              data={data}
              loading={loading}
              onFinish={this.onFinish}
              closeForm={closeForm}
              token={boardId}
            />
          );
        }}
      </Mutation>
    );
  }
}
