import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { ApolloProvider } from "react-apollo";

import { Routes } from "./Routes";
import { client } from "./apollo";

import * as serviceWorker from "./serviceWorker";

const theme = {
  primaryColor: "#4786FF",
  linkColor: "#4786FF",
  textColor: "#1B2437",
  secondaryTextColor: "#757A7D",
  backgroundColor: "#F5F7FA",
  iconColor: "#E0E2E5",
  errorColor: "#F1453D",
  successColor: "#c9efe0",
  successBackground: "#82EAC5",
  errorBackground: "#FEF2F2",
  textColorSecondary: "#9A9C9F",
  borderColorBase: "#E0E2E5",
  focusShadow: "0 0 0 2px rgba(134, 177, 255, 0.5)",
  shadowColor: "rgba(134, 177, 255, 0.5)",
  boxShadowBase: "0 2px 4px rgba(0,0,0,0.1)"
};

const GlobalStyle = createGlobalStyle`

  html {
    box-sizing: border-box;
    background-color: ${props => props.theme.backgroundColor};

  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    @import url("https://fonts.googleapis.com/css?family=Open+Sans:400,500,700");
    font-family: "Open Sans", sans-serif;
    font-size: 14px;
    margin: 0;
    padding: 0;
  }
`;

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Routes />
        <GlobalStyle />
      </React.Fragment>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
