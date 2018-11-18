import * as React from "react";
import styled from "styled-components";

const FormItem = styled.div`
  margin: 15px 0;
`;

const Input = styled.input`
  height: 40px;
  min-width: 70px;
  width: 100%;
  border: 1px solid ${props => props.theme.borderColorBase};
  border-radius: 3px;
  padding: 0 8px;
  line-height: 40px;
  font-size: 14px;
  color: ${props => props.theme.textColor};
  &:hover {
    border: 1px solid ${props => props.theme.primaryColor};
  }
  &:focus {
    box-shadow: ${props => props.theme.focusShadow};
    border-color: ${props => props.theme.primaryColor};
    outline: 0;
  }

  ::placeholder {
    color: ${props => props.theme.secondaryColor};
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    color: ${props => props.theme.secondaryColor};
  }

  ::-ms-input-placeholder {
    color: ${props => props.theme.secondaryColor};
  }
`;

const ErrorMessage = styled.div`
  line-height: 12px;
  height: 10px;
  padding: 7px 2px;
  width: 100%;
  color: ${props => props.theme.errorColor};
`;

export const InputField = ({
  field: { onChange, ...field },
  form: { touched, errors },
  label,
  ...props
}) => {
  const errorMsg = touched[field.name] && errors[field.name];

  return (
    <FormItem
      label={label}
      help={errorMsg}
      hasFeedback={!!errorMsg}
      validateStatus={errorMsg ? "error" : undefined}
      className="input-wrapper"
    >
      <Input {...field} {...props} onChange={onChange} />
      <ErrorMessage>{errorMsg}</ErrorMessage>
    </FormItem>
  );
};
