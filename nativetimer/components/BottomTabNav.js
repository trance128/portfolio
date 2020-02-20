/*
Bottom Tab Nav component.

This project uses this tab component with custo navigation as not all tabs are full
screens -- due to this, RN Tab Nav was not appropriate choice. Neither was
stack navigator
*/

import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import { pause, showOptions, reset } from '../redux';

export default function BottomTabNav( ) {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={() => dispatch(showOptions())} style={styles.item}>
        <View style={styles.center}>
          <Ionicons style={styles.ion} size={20} name="md-options" color="#fff" />
          <Text style={styles.text}>Settings</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => dispatch(pause())} style={styles.item}>
        <View style={styles.center}>
          <Ionicons style={styles.ion} size={20} name="md-pause" color="#fff" />
          <Text style={styles.text}>Pause</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => dispatch(reset())} style={styles.item}>
        <View style={styles.center}>
          <Ionicons style={styles.ion} size={20} name="md-refresh" color="#fff" />
          <Text style={styles.text}>Reset</Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ion: {
    padding: 5,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  }
})
