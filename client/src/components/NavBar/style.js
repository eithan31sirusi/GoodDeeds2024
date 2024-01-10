import styled from "styled-components";

export const NavContainer = styled.nav`
  background-color: var(--deepBlue);
  padding: 10px 20px;
`;

export const Logo = styled.div`
  font-size: 24px;
  color: var(--white);
  font-weight: var(--fontWeightBold);
  // Add more styles for the logo
`;

export const NavLinkContainer = styled.div`
  a {
    color: var(--white);
    margin-left: 20px;
    text-decoration: none;
    font-weight: var(--fontWeightRegular);

    &:hover {
      text-decoration: underline;
    }
  }

  // Responsive adjustments if needed
  @media (max-width: var(--mobileL)) {
    a {
      margin-left: 10px;
      font-size: 14px;
    }
  }
`;
