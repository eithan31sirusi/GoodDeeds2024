import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LoaderProvider } from "./context/LoaderContext";
import { DeedsProvider } from "./context/DeedsContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LoaderProvider>
          <DeedsProvider>
            <App />
          </DeedsProvider>
        </LoaderProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
