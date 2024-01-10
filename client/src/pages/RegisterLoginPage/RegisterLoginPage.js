import React, { useState } from "react";

import Alert from "../../components/common/Alert/Alert";
import {
  FormInput,
  SignupForm,
  SignupPageContainer,
  SignupTitle,
  SubmitButton,
} from "./styles";
const initalState = {
  fullName: "",
  email: "",
  password: "",
  isMember: false,
  showAlert: false, //incharge of showing the alert component
};
const RegisterLoginPage = () => {
  const [values, setValues] = useState(initalState);
  // global state and useNvigate

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle form submission
  };

  return (
    <SignupPageContainer>
      <SignupTitle>Sign Up</SignupTitle>
      <Alert />
      <SignupForm onSubmit={handleSubmit}>
        <FormInput
          type="text"
          placeholder="Full Name"
          required
          value={values.name}
          name="name"
        />
        <FormInput
          type="email"
          placeholder="Email Address"
          required
          value={values.email}
        />
        <FormInput
          type="password"
          placeholder="Password"
          required
          value={values.password}
        />
        <SubmitButton type="submit">Sign Up</SubmitButton>
      </SignupForm>
    </SignupPageContainer>
  );
};

export default RegisterLoginPage;
