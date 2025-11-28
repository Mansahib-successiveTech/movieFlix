"use client";

import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './apolloClient';

export default function ApolloWrapper({ children }) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}