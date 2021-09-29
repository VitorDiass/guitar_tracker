import { ApolloClient, InMemoryCache } from "@apollo/client";

const URI = "http://:4000/";

export const client = new ApolloClient({
    uri: URI,
    cache: new InMemoryCache(),
});