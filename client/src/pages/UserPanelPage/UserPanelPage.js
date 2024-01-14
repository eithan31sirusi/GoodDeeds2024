import React, { useState, useContext, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { DeedsContext } from "../../context/DeedsContext";
import { LoaderContext } from "../../context/LoaderContext";

import validationSchema from "../../utils/validationSchemas";
import { useNavigate } from "react-router-dom";

import CardList from "../../components/CardsList/CardsList";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import { AuthContext } from "../../context/AuthContext";

const UserPanelPage = () => {
  const { globalDeeds, personalDeeds, addPersonalDeed } =
    useContext(DeedsContext);
  useContext(AuthContext);

  const { setLoading } = useContext(LoaderContext);
  const { user } = useContext(AuthContext);
  const [newDeed, setNewDeed] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!user) {
      // If user is not logged in, redirect to the login page or show a message
      navigate("/login");
      // Or show a message like "Please log in to continue"
      return;
    }
    addPersonalDeed(newDeed);
  };

  return (
    <div>
      <h1>Your Deeds Panel</h1>

      <Formik
        initialValues={newDeed}
        validationSchema={validationSchema.createDeedSchema} // Adjust this schema as needed
        onSubmit={handleSubmit}
      >
        <Form>
          <Field
            name="title"
            type="text"
            placeholder="Title"
            component={CustomInput}
          />
          <Field
            name="description"
            type="text"
            placeholder="Description"
            component={CustomInput}
          />
          <CustomButton type="submit">Create Deed</CustomButton>
        </Form>
      </Formik>
      <h2>Global Deeds</h2>
      <CardList items={globalDeeds} layout="grid" />

      <h2>Your Personal Deeds</h2>
      <CardList items={personalDeeds} layout="list" />
    </div>
  );
};

export default UserPanelPage;
