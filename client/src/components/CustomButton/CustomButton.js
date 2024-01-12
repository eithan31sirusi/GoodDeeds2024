import { StyledButton } from "./style";

const CustomButton = ({ children, type }) => {
  return <StyledButton type={type}>{children}</StyledButton>;
};

export default CustomButton;
