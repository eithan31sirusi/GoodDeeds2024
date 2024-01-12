import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import CustomInput from "./CustomInput"; // Adjust path as needed
import CustomButton from "./CustomButton"; // Adjust path as needed

const CustomForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  children,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          {React.Children.map(children, (child) => {
            if (child.type === CustomInput) {
              const fieldName = child.props.name;
              return React.cloneElement(child, {
                error: touched[fieldName] && errors[fieldName],
              });
            }
            return child;
          })}
          <CustomButton type="submit">Submit</CustomButton>
        </Form>
      )}
    </Formik>
  );
};

export default CustomForm;
