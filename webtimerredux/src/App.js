import React from 'react';
import './App.css';
import './stylesheets.css';
import { Main } from './Main';
import { Provider } from 'react-redux';
import store from './store';

export default class extends React.Component {
  render() {
    return(
      <Provider store={ store }>
        <Main />
      </Provider>
    )
  }
}
