/*  Just a set up for the main app, loads the store and gives it to children */

import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import Main from './Main';
import { store } from './store';

export default class App extends React.Component {
  render() {
    return(
      <Provider store={ store }>
        <Main />
      </Provider>
    );
  }
}
