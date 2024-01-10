import styled from "styled-components";

export const ListContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.layout === "row" ? "row" : "column")};
  flex-wrap: ${(props) => (props.layout === "pairs" ? "wrap" : "nowrap")};
  gap: 15px;
  overflow-y: auto; // Makes the list scrollable
  padding: 10px;
  max-height: 500px; // Adjust based on your needs

  & > div {
    flex: ${(props) =>
      props.layout === "pairs" ? "0 1 calc(50% - 15px)" : "0 0 100%"};
  }
`;
