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
import { setContext } from '@apollo/client/link/context';

import Navbar from './components/Navbar';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, {headers}) => {
const token = localStorage.getItem('id_token')
return { headers : { ...headers, authorization: token ? 'Bearer ${token}' : '',
},
};
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
