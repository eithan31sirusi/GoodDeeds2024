import styled from "styled-components";
import { Link } from "react-router-dom";

export const FooterContainer = styled.footer`
  background-color: var(--grey);
  color: var(--deepBlue);
  display: flex;
  justify-content: space-around;
  padding: 20px;
  flex-wrap: wrap;
  position: sticky;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

export const SocialLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  svg {
    fill: var(--deepBlue);
    cursor: pointer;
    width: 20px; // Control the size of the icons here
    height: 20px; // Ensure icons are square or adjust as needed

    &:hover {
      fill: var(--skyBlue);
    }
  }
`;

export const Info = styled.p`
  text-align: center;
`;

export const LinkItem = styled(Link)`
  color: var(--deepBlue);
  text-decoration: none;
  margin-bottom: 10px;
  &:hover {
    text-decoration: underline;
  }
`;
