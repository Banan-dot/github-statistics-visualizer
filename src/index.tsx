import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeContext } from "@skbkontur/react-ui";
import appTheme from "./utils/appTheme";
import ENDPOINTS from "./api/endpoints";

const httpLink = {
  uri: ENDPOINTS.GITHUB_GRAPHQL_API,
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
  },
};

const client = new ApolloClient({
  link: new HttpLink(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <ThemeContext.Provider value={appTheme}>
        <App />
      </ThemeContext.Provider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
