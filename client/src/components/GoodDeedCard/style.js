import styled from "styled-components";

export const CardContainer = styled.div`
  background-color: var(--white);
  border: 1px solid var(--grey);
  border-radius: 8px;
  padding: 15px;
  margin: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
`;

export const Title = styled.h2`
  color: var(--deepBlue);
  margin-bottom: 10px;
`;

export const Description = styled.p`
  color: var(--grey);
`;

export const Status = styled.span`
  display: inline-block;
  background-color: var(--turquoise);
  color: var(--deepBlue);
  padding: 5px 10px;
  border-radius: 5px;
  margin-top: 10px;
`;

export const CreationDate = styled.div`
  margin-top: 15px;
  font-size: 0.9em;
  color: var(--skyBlue);
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 15px;
`;
