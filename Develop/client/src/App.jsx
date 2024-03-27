import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import Navbar from './components/Navbar';
import { apolloClient } from '../../../ApolloClient';

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
