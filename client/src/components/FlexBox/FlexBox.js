import React from "react";
import { StyledFlexBox } from "./style";

const FlexBox = ({ children, direction, justify, align, wrap }) => {
  return (
    <StyledFlexBox
      direction={direction}
      justify={justify}
      align={align}
      wrap={wrap}
    >
      {children}
    </StyledFlexBox>
  );
};

export default FlexBox;
