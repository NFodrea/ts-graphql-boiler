import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Routes } from './Routes';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Pass your GraphQL endpoint to uri
const client = new ApolloClient({ 
  uri: 'http://localhost:4000/graphql',
  credentials: "include" 
});

ReactDOM.render(
  <ApolloProvider
    client={client}
  >
    <Routes />
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
