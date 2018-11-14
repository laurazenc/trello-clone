import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { ApolloProvider } from "react-apollo";

import Routes from "./Routes";
import { client } from "./apollo";

import * as serviceWorker from "./serviceWorker";

const theme = {
  primaryColor: "#4786FF",
  linkColor: "#4786FF",
  textColor: "#1B2437",
  iconColor: "#E0E2E5",
  textColorSecondary: "#9A9C9F",
  borderColorBase: "#F0F1F4",
  boxShadowBase: "0 2px 4px rgba(0,0,0,0.1)"
};

const GlobalStyle = createGlobalStyle`
html {
    box-sizing: border-box;
    font-size: 12px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
`;

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <GlobalStyle />
    </ApolloProvider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
