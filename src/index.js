import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import store from './store';
import client from './utils/graphqlClient';

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
        <App />
      </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);