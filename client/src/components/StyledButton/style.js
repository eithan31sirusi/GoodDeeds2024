import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: var(--turquoise);
  color: var(--white);
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: var(--fontWeightRegular);

  &:hover {
    background-color: var(--skyBlue);
  }
`;
