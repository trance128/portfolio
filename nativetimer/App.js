/*
Main App container.  Contains navigators, gives components access to store

Despite appearance, this app uses Switch Navigator.  Tab Nav is for presentation
only, due to Reset and Pause being functions rather than screens.  Further, when
switching between screens such as Timer / Play, we need to run functions to start
or pause screens, rather than simply switching like other apps; therefore, Stack
Nav was also a wrong choice.  As such, a custom nav was coded rather than using
React Navigation.
*/

import 'react-native-gesture-handler';
import React from 'react';
import {Provider, useSelector} from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

import store from './redux';
import Navigation from './Navigation';

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
