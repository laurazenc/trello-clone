import React, { Component } from "react";
import { withFormik, Field } from "formik";
import { validBoardSchema } from "../../../../utils/validations/boardSchema";
import styled from "styled-components";

import { IconButton } from "./../../../../components/IconButton";
import { InputField } from "./../../../../components/Fields/InputField";

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: flex-start;

  .input-wrapper {
    margin: 0;
    flex: 1;
  }

  .icon-button-wrapper {
    margin-left: 16px;
  }
`;

class EditBoardForm extends Component {
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
      this.props.stopEditing();
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
        <IconButton type="submit" />
      </Form>
    );
  }
}

export default withFormik({
  validationSchema: validBoardSchema,
  mapPropsToValues: props => ({ name: props.value }),
  handleSubmit: async (values, { props }) => {
    try {
      const data = await props.editBoard({
        variables: { id: props.token, name: values.name }
      });
      if (data) await props.onFinish(data);
    } catch (e) {
      console.log(e);
    }
  }
})(EditBoardForm);
