import { ApolloClient, InMemoryCache, split, HttpLink, ApolloLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';


const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

// Auth link to inject token
const authLink = new ApolloLink((operation, forward) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? token : '',
    },
  }));
  return forward(operation);
});

const wsLink = typeof window !== 'undefined' ? new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000/graphql', // Change if your GraphQL server runs elsewhere
  })
) : null;


const splitLink = typeof window !== 'undefined' && wsLink ? split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
) : authLink.concat(httpLink);

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});