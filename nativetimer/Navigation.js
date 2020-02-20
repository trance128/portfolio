/*
Main App container.  Contains navigators, gives components access to store

Despite appearance, this app uses Switch Navigator.  Tab Nav is for presentation
only, due to Reset and Pause being functions rather than screens.  Further, when
switching between screens such as Timer / Play, we need to run functions to start
or pause screens, rather than simply switching like other apps; therefore, Stack
Nav was also a wrong choice.  As such, a custom nav was coded rather than using
React Navigation.
*/

import React from 'react';
import {useSelector} from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

import Play from './screens/Play';
import Options from './screens/Options';
import Timer from './screens/Timer';
import BottomTabNav from './components/BottomTabNav'

export default function Navigation() {
  // getting presentational info from store
  const paused = useSelector(state => state.paused);
  const started = useSelector(state => state.started);
  const showOptions = useSelector(state => state.showOptions);

  return (
      <View style={styles.container}>
        <View style={styles.main}>
          { showOptions && <Options />}
          { (!showOptions && (!started || paused)) && <Play />}
          { (!showOptions && started && !paused) && <Timer />}
        </View>
        <View style={styles.botNav}>
          <BottomTabNav />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  main: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 9,
  },
  botNav: {
    backgroundColor: 'blue',
    flex: 1,
  }
});
