import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import Navbar from './components/Navbar';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Router>
      <Navbar />
      <Outlet />
      </Router>
    </ApolloProvider>
  );
}

export default App;
