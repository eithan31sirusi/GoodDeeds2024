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
      const response = await axios.post(
        `http://localhost:5000/api/${endpoint}`,
        values
      );
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      setTimeout(() => {
        if (endpoint === "users/login") {
          login({ user, token }); // Update user state on login
          navigate("/dashboard");
        } else if (endpoint === "users/register") {
          login({ user, token }); // Update user state on login
          // Registration successful
          alert("Registration successful. Please log in."); // Or use a more sophisticated method to show the message
          setIsLogin(true); // Switch to login form
          navigate("/dashboard");
        }
      }, 3000);
    } catch (error) {
      console.error("Authentication failed:", error);
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
