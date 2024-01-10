import React from "react";
import { Link } from "react-router-dom";
import { NavContainer, NavLinkContainer } from "./style";
import FlexBox from "../FlexBox/FlexBox"; // Adjust the path as per your project structure

const Navigation = () => {
  return (
    <NavContainer>
      <FlexBox justify="space-between" align="center">
        <NavLinkContainer>
          <Link to="/">Home</Link>
          <Link to="/login">Register/Login</Link>
          <Link to="/dashboard">Dashboard</Link>
          {/* Logo placeholder */}
        </NavLinkContainer>
      </FlexBox>
    </NavContainer>
  );
};

export default Navigation;
