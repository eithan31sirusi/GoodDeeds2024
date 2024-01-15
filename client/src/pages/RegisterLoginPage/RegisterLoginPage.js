import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import validationSchema from "../../utils/validationSchemas";
import { AuthContext } from "../../context/AuthContext";
import { LoaderContext } from "../../context/LoaderContext";
import axios from "axios";

import {
  LoginRegisterContainer,
  FormTitle,
  ToggleText,
  StyledForm,
} from "./styled";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";

const RegisterLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { setLoading } = useContext(LoaderContext); // Use both loading and setLoading
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAuth = async (values, endpoint) => {
    setLoading(true);
    try {
      if (endpoint === "users/login") {
        await login(values); // Call login from AuthContext
        navigate("/dashboard");
      } else if (endpoint === "users/register") {
        const response = await axios.post(
          `http://localhost:5000/api/${endpoint}`,
          values
        );
        const { token, user } = response.data;
        await login({ user, token }); // Call login from AuthContext
        setIsLogin(true); // Switch to login form
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error request:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error:", error.message);
      }
      console.error("Error config:", error.config);
    }
    setLoading(false);
  };

  return (
    <LoginRegisterContainer>
      <FormTitle>{isLogin ? "Login" : "Register"}</FormTitle>
      {isLogin ? (
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema.loginSchema}
          onSubmit={(values) => handleAuth(values, "users/login")}
        >
          {() => (
            <StyledForm>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                component={CustomInput}
              />
              <Field
                name="password"
                type="password"
                placeholder="Password"
                component={CustomInput}
              />
              <CustomButton type="submit">Login</CustomButton>
            </StyledForm>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validationSchema={validationSchema.registerSchema}
          onSubmit={(values) => handleAuth(values, "users/register")}
        >
          {() => (
            <StyledForm>
              <Field
                name="username"
                type="text"
                placeholder="Username"
                component={CustomInput}
              />
              <Field
                name="email"
                type="email"
                placeholder="Email"
                component={CustomInput}
              />
              <Field
                name="password"
                type="password"
                placeholder="Password"
                component={CustomInput}
              />
              <CustomButton type="submit">Register</CustomButton>
            </StyledForm>
          )}
        </Formik>
      )}
      <ToggleText onClick={() => setIsLogin(!isLogin)}>
        {isLogin
          ? "Don't have an account? Register here."
          : "Already have an account? Login here."}
      </ToggleText>
    </LoginRegisterContainer>
  );
};

export default RegisterLogin;
