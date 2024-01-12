import styled from "styled-components";

export const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid ${(props) => (props.error ? "var(--red)" : "var(--grey)")};
  border-radius: 5px;
  margin-bottom: 5px;

  &:focus {
    outline: none;
    border-color: var(--blue1);
  }
`;

export const ErrorText = styled.div`
  color: var(--red);
  font-size: 0.8rem;
  margin-top: 5px;
`;
