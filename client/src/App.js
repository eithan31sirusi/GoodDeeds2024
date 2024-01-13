import React, { useContext } from "react";

import styled from "styled-components";

import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";

import GlobalStyle from "./layout/GlobalStyle/GlobalStyle";
import { StyledFlexBox } from "./components/FlexBox/style";
import UserPanelPage from "./pages/UserPanelPage/UserPanelPage";
import RegisterLoginPage from "./pages/RegisterLoginPage/RegisterLoginPage";

import CardList from "./components/CardsList/CardsList";
import HeartLoader from "./assets/animation/HeartLoader";
import { LoaderContext } from "./context/LoaderContext";

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
  const { loading } = useContext(LoaderContext);
  return (
    <AppContainer>
      <GlobalStyle />
      {loading && <HeartLoader />}
      <Header />
      <MainContent direction="column" justify="center" align="center">
        <h1>אפליקצית מעשים טובים</h1>

        <RegisterLoginPage />
        <CardList />
      </MainContent>
      <Footer />
    </AppContainer>
  );
}

export default App;
