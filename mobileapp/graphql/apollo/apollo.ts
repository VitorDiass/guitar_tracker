import { ApolloClient, InMemoryCache } from "@apollo/client";

const URI = "http://192.168.221.238:4000/";

export const client = new ApolloClient({
    uri: URI,
    cache: new InMemoryCache(),
});