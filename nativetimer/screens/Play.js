import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import { completeStart, completeUnpause, pause } from '../redux';

export default function Play( props ) {
  // getting data from redux store
  const paused = useSelector(state => state.paused);
  const started = useSelector(state => state.started);

  // redux dispatch using hooks
  const dispatch = useDispatch();
  const boundPause = () => dispatch(pause());
  const boundStart = () => dispatch(completeStart(Date.now()));
  const boundUnpause = () => dispatch(completeUnpause(Date.now()));

  // presentational state used only in this component
  const topMessage = {
    start: "Press Play to Start",
    unpause: "Press Play to Unpause\nOr Reset to Restart Timer"
  }

  // pauses timer if we load component from bottom tab nav
  useEffect(() => {
    if(started){
      boundPause();
    }
  });

  // handles what to do when play button is pressed
  const play = () => {
    paused ? boundUnpause() : boundStart()
  }

  return(
    <View style={styles.container}>
      <View style={styles.s1}>
        <Text style={styles.text}>{ paused ? topMessage["unpause"] : topMessage["start"]}</Text>
      </View>
      <View style={styles.s2}>
        <TouchableHighlight onPress={() => play()}>
          <Ionicons name="md-play-circle" size={200} color='#fff' />
        </TouchableHighlight>
      </View>
      <View style={styles.s1}>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  s1: {
    flex: 1,
    justifyContent: 'center',
  },
  s2: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
