import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";
import NavBar from "./components/NavBar/Navigation";
import GlobalStyle from "./layout/GlobalStyle/GlobalStyle";
import { StyledFlexBox } from "./components/FlexBox/style";

// App Container
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

// Main Content
const MainContent = styled(StyledFlexBox)`
  flex-grow: 1; // Grow to take available space
`;

function App() {
  return (
    <AppContainer>
      <GlobalStyle />
      <Header />
      <MainContent direction="column" justify="center" align="center">
        <h1>אפליקצית מעשים טובים</h1>
        {/* Add other main content here */}
      </MainContent>
      <Footer />
    </AppContainer>
  );
}

export default App;
