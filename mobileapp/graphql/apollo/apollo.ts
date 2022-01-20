import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
/* import { onError } from 'apollo-link-error'; */

//const URI = "http://192.168.221.238:4000/";
const URI = "http://192.168.244.253:4444/";

/* const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
  }) */

export const client = new ApolloClient({
    uri: URI,
    cache: new InMemoryCache({
      addTypename : false
    }),
  
});