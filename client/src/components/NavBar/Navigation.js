import { Link } from "react-router-dom";
import { NavContainer, NavLinkContainer } from "./style";
import FlexBox from "../FlexBox/FlexBox";
import { AuthContext } from "../../context/AuthContext"; // Adjust the path as per your project structure
import { useContext } from "react";

const Navigation = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // Clear the user state and localStorage
  };

  return (
    <NavContainer>
      <FlexBox justify="space-between" align="center">
        <NavLinkContainer>
          <Link to="/">Home</Link>
          {user ? (
            <Link onClick={handleLogout}>Logout</Link>
          ) : (
            <Link to="/login">Register/Login</Link>
          )}
          <Link to="/dashboard">Dashboard</Link>
          {/* Logo placeholder */}
        </NavLinkContainer>
      </FlexBox>
    </NavContainer>
  );
};

export default Navigation;
