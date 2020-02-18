/*
Main app container.  Provides store and Navigation, which itself is imported from RootStack
*/

import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { RootStack } from './screens/RootStack';
import { store } from './store'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
