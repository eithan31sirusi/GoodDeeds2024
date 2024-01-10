import { createGlobalStyle } from "styled-components";

// Define color palette
const colors = {
  deepBlue: "#5680E9",
  turquoise: "#84CEEB",
  skyBlue: "#5AB9EA",
  grey: "#C1C8E4",
  white: "#F3FDFE",
};

// Define typography
const typography = {
  fontFamily: "'Noto Sans Hebrew', sans-serif",
  bodyFontSize: "16px",
  headerFontSize: "24px",
  fontWeightLight: "300",
  fontWeightRegular: "400",
  fontWeightBold: "700",
};

// Define responsive screen sizes
const screenSize = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

const GlobalStyle = createGlobalStyle`
    :root {
        // Color variables
        --deepBlue: ${colors.deepBlue};
        --turquoise: ${colors.turquoise};
        --skyBlue: ${colors.skyBlue};
        --grey: ${colors.grey};
        --white: ${colors.white};

        // Typography variables
        --fontFamily: ${typography.fontFamily};
        --bodyFontSize: ${typography.bodyFontSize};
        --headerFontSize: ${typography.headerFontSize};
        --fontWeightLight: ${typography.fontWeightLight};
        --fontWeightRegular: ${typography.fontWeightRegular};
        --fontWeightBold: ${typography.fontWeightBold};

        // Responsive screen sizes
        --mobileS: ${screenSize.mobileS};
        --mobileM: ${screenSize.mobileM};
        --mobileL: ${screenSize.mobileL};
        --tablet: ${screenSize.tablet};
        --laptop: ${screenSize.laptop};
        --laptopL: ${screenSize.laptopL};
        --desktop: ${screenSize.desktop};
    }

    // Resetting default styles
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: var(--fontFamily);
        font-size: var(--bodyFontSize);
        background-color: var(--white); // Using light color as background
        color: var(--deepBlue); // Default text color
        min-height: 100vh;
    }

    h1, h2, h3, h4, h5, h6 {
        font-size: var(--headerFontSize);
        color: var(--turquoise); // Headers color
        font-weight: var(--fontWeightBold);
        margin:1rem;
    }

    // Media queries for responsiveness
    @media (max-width: var(--tablet)) {
        body {
            font-size: calc(var(--bodyFontSize) - 2px); // Slightly smaller font for tablets
        }
    }

    @media (max-width: var(--mobileL)) {
        body {
            font-size: calc(var(--bodyFontSize) - 4px); // Even smaller font for mobile
        }
    }

    // Add more global styles or media queries as needed
`;

export default GlobalStyle;
