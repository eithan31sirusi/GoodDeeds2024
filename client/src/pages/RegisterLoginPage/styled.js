import styled from "styled-components";
import { Form } from "formik";

export const LoginRegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: var(--white);
  width: 100%;
  max-width: 300px; // Adjust the width as needed
  margin: 30px auto;
`;

export const FormTitle = styled.h2`
  color: var(--deepBlue);
  margin-bottom: 20px;
`;

export const ToggleText = styled.p`
  color: var(--grey);
  margin-top: 15px;
  cursor: pointer;
  &:hover {
    color: var(--skyBlue);
  }
`;

export const StyledForm = styled(Form)`
  width: 100%;
`;
