import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

const link = new HttpLink({
  uri: "http://localhost:4000",
  credentials: "include"
});

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true
});
