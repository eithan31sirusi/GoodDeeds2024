import React from "react";
import { LoaderContainer } from "./styled";

const Loader = () => {
  return (
    <LoaderContainer>
      <svg
        width="250px"
        height="600px"
        viewBox="0 0 471.701 471.701"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="none"
          stroke="#5680E9"
          stroke-width="3"
          d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1 c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3 l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4 C471.801,124.501,458.301,91.701,433.601,67.001z"
        ></path>
      </svg>
    </LoaderContainer>
  );
};

export default Loader;
