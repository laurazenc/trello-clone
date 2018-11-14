import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { ApolloProvider } from "react-apollo";

import Routes from "./Routes";
import { client } from "./apollo";

import * as serviceWorker from "./serviceWorker";

const theme = {
  primaryColor: "#FF5A5F",
  linkColor: "#008489",
  textColor: "#484848",
  textColorSecondary: "#585A3A",
  borderColorBase: "#E5E5E5",
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
