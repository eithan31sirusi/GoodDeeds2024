import * as yup from "yup";

// Schema for Login Form
const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

// Schema for Register Form
const registerSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

const updateUserProfileSchema = yup.object().shape({
  username: yup.string(), // Assuming username can be updated
  email: yup.string().email("Invalid email"), // Email update is optional
  // Include other updatable fields
});

const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required("Old password is required"),
  newPassword: yup
    .string()
    .min(6, "New password must be at least 6 characters long")
    .required("New password is required"),
});

const createDeedSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

const updateDeedSchema = yup.object().shape({
  title: yup.string(), // Title is optional in updates
  description: yup.string(),
});

const validationSchema = {
  updateUserProfileSchema,
  registerSchema,
  loginSchema,
  changePasswordSchema,
  createDeedSchema,
  updateDeedSchema,
};

export default validationSchema;
