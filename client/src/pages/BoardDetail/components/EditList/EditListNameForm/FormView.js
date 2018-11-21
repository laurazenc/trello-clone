import React, { Component } from "react";
import { withFormik, Field } from "formik";
import { validBoardSchema } from "./../../../../../utils/validations/boardSchema";
import styled from "styled-components";

import { InputField } from "./../../../../../components/Fields/InputField";

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: flex-start;

  .input-wrapper {
    margin: 0;
    flex: 1;
  }
`;

class EditListForm extends Component {
  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.handleSubmit();
    }
  };
  render() {
    const { handleSubmit } = this.props;
    return (
      <Form ref={this.setWrapperRef} onSubmit={handleSubmit}>
        <Field
          name="name"
          size="large"
          placeholder="Name"
          component={InputField}
        />
      </Form>
    );
  }
}

export default withFormik({
  validationSchema: validBoardSchema,
  mapPropsToValues: props => ({ name: props.value }),
  handleSubmit: async (values, { props }) => {
    try {
      const data = await props.editList({
        variables: { id: props.token, name: values.name }
      });
      if (data) await props.onFinish(data);
    } catch (e) {
      console.log(e);
    }
  }
})(EditListForm);
