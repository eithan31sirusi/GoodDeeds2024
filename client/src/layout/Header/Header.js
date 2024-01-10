import React from "react";
import Navigation from "../../components/NavBar/Navigation";
import { HeaderContainer, Logo } from "./style";

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>GoodDeeds</Logo>
      <Navigation/>
      {/* Add other elements or navigation links */}
    </HeaderContainer>
  );
};

export default Header;
