import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({ uri: "https://1c97-103-89-180-3.ngrok-free.app/graphql" }),
  cache: new InMemoryCache(),
});

export default client;
