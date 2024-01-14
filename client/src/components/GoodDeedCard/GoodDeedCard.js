import React from "react";
import { StyledButton } from "../CustomButton/style";
import {
  CardContainer,
  Title,
  Description,
  Status,
  CreationDate,
  ButtonContainer,
} from "./style";

const GoodDeedCard = ({
  title,
  description,
  status,
  creationDate,
  isPersonal,
}) => {
  return (
    <CardContainer>
      <Title>{title}</Title>
      <Description>{description}</Description>
      {isPersonal && status && <Status>Status: {status}</Status>}
      {isPersonal && creationDate && (
        <CreationDate>
          Created on: {new Date(creationDate).toLocaleDateString()}
        </CreationDate>
      )}
      <ButtonContainer>
        <StyledButton
          onClick={() => {
            /* Handle Take GoodDeed action */
          }}
        >
          Take GoodDeed
        </StyledButton>
        {!isPersonal && (
          <StyledButton
            onClick={() => {
              /* Handle Status action */
            }}
          >
            Status
          </StyledButton>
        )}
        {!isPersonal && (
          <StyledButton
            onClick={() => {
              /* Handle Remove action */
            }}
          >
            Remove
          </StyledButton>
        )}
      </ButtonContainer>
    </CardContainer>
  );
};
export default GoodDeedCard;
