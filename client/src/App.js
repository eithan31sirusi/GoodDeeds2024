import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";
import NavBar from "./components/NavBar/Navigation";

import GlobalStyle from "./layout/GlobalStyle/GlobalStyle";
import { StyledFlexBox } from "./components/FlexBox/style";

function App() {
  return (
    <>
      <GlobalStyle />

      <StyledFlexBox direction="column" justify="center" align="center">
        <Header />
        <h1>אפליקצית מעשים טובים</h1>
        <Footer />
      </StyledFlexBox>

      {/* Rest of your app */}
    </>
  );
}

export default App;
