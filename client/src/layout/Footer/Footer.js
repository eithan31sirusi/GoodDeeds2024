import React from "react";
import {
  FooterContainer,
  FooterColumn,
  SocialLinks,
  Info,
  LinkItem,
} from "./style";
import { ReactComponent as FacebookIcon } from "../../assets/SVG/facebook-round-color-icon.svg";
import { ReactComponent as TiktokIcon } from "../../assets/SVG/tiktok-color-icon.svg";
import { ReactComponent as InstagramIcon } from "../../assets/SVG/ig-instagram-icon.svg";
import { ReactComponent as LinkedinIcon } from "../../assets/SVG/linkedin-square-icon.svg";
import { ReactComponent as GitHubIcon } from "../../assets/SVG/github-icon.svg";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterColumn>© {new Date().getFullYear()} GoodDeeds</FooterColumn>
      <FooterColumn>
        <Info>
          GoodDeeds - Enhancing community engagement and social responsibility.
        </Info>
      </FooterColumn>{" "}
      <FooterColumn>
        <LinkItem to="/">Home</LinkItem>
        <LinkItem to="/panel">Panel</LinkItem>
        <LinkItem to="/login">Register/Login</LinkItem>
      </FooterColumn>
      <FooterColumn>
        <SocialLinks>
          {" "}
          <a
            href="https://www.instagram.com/eithansirusi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/eithansirusi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinIcon />
          </a>
          <a
            href="https://github.com/eithan31sirusi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100079635811888"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon />
          </a>
          <a
            href="https://www.tiktok.com/@eitan.sirusi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TiktokIcon />
          </a>
        </SocialLinks>
      </FooterColumn>
    </FooterContainer>
  );
};

export default Footer;
