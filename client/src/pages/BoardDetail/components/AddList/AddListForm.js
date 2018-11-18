import React, { Component } from "react";
import { withFormik, Field } from "formik";
import { validListSchema } from "../../../../utils/validations/listSchema";
import styled from "styled-components";

import { IconButton } from "./../../../../components/IconButton";
import { InputField } from "./../../../../components/Fields/InputField";

const Form = styled.form`
  box-shadow: ${props => props.theme.boxShadowBase};
  background-color: white;
  border-radius: 3px;
  display: flex;
  align-items: center;
  padding: 16px 24px;
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

class AddListForm extends Component {
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
      this.props.closeForm();
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
  validationSchema: validListSchema,
  mapPropsToValues: () => ({ name: "" }),
  handleSubmit: async (values, { props }) => {
    try {
      const data = await props.createList({
        variables: { name: values.name, boardId: props.token }
      });
      if (data) await props.onFinish(data);
    } catch (e) {
      console.log(e);
    }
  }
})(AddListForm);
