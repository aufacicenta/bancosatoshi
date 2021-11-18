import { ApolloClient, InMemoryCache } from "@apollo/client";

export const GQLClient = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});
