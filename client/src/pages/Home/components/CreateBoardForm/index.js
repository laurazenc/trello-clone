import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import FormView from "./FormView";

const CREATEBOARD_MUTATION = gql`
  mutation CREATEBOARD_MUTATION($name: String!) {
    createBoard(name: $name) {
      result {
        name
      }
      errors {
        path
        message
      }
    }
  }
`;

class CreateBoardForm extends Component {
  onFinish = values => {
    const {
      data: {
        createBoard: { errors }
      }
    } = values;

    if (errors) return null;

    this.props.closeForm();
  };
  render() {
    return (
      <Mutation mutation={CREATEBOARD_MUTATION}>
        {(createBoard, { data, loading }) => {
          return (
            <FormView
              onFinish={this.onFinish}
              createBoard={createBoard}
              data={data}
              loading={loading}
              closeForm={this.props.closeForm}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default CreateBoardForm;
