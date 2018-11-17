import React, { Component } from "react";
import { withFormik, Field } from "formik";
import { validBoardSchema } from "../../../../utils/validations/boardSchema";
import styled from "styled-components";

import { Button } from "./../../../../components/Button";
import { InputField } from "./../../../../components/Fields/InputField";

const Container = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  background-color: ${props => props.theme.shadowColor};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  box-shadow: ${props => props.theme.boxShadowBase};
  background-color: white;
  padding: 16px;
  border-radius: 3px;
  min-width: 400px;

  h1 {
    color: ${props => props.theme.textColor};
  }
`;

class FormView extends Component {
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
      <Container>
        <Form ref={this.setWrapperRef} onSubmit={handleSubmit}>
          <h1>Create a new board</h1>
          <Field
            name="name"
            size="large"
            placeholder="Name"
            component={InputField}
          />
          <Button type="submit">Create board</Button>
        </Form>
      </Container>
    );
  }
}

export default withFormik({
  validationSchema: validBoardSchema,
  mapPropsToValues: () => ({ name: "" }),
  handleSubmit: async (values, { props }) => {
    try {
      const data = await props.createBoard({ variables: values });
      if (data) await props.onFinish(data);
    } catch (e) {
      console.log(e);
    }
  }
})(FormView);
