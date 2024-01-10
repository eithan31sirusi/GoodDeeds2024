import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: ${(props) => props.backgroundColor || "var(--turquoise)"};
  color: var(--white);
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: var(--fontWeightRegular);
  margin: 5px;

  &:hover {
    background-color: var(--skyBlue);
  }
`;
