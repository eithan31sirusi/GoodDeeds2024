import React from "react";
import { StyledInput, ErrorText } from "./CustomInput.style";

const CustomInput = ({ field, form: { touched, errors }, ...props }) => {
  const error = touched[field.name] && errors[field.name];
  return (
    <>
      <StyledInput {...field} {...props} error={error} />
      {error && <ErrorText>{error}</ErrorText>}
    </>
  );
};

export default CustomInput;
