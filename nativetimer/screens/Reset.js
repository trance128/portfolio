/*
Reset function.
Resets timer and redirects to Play screen
*/

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { reset } from '../redux';

export default function Reset({ navigation }) {
  // redux dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());
    navigation.jumpTo("Main");

    // sometimes it doesn't work the  first time, so try again
    setTimeout(() => {
      dispatch(reset());
      navigation.jumpTo("Main");
    }, 50)
  })

  return(
    <View styles={styles.container}>
      <Text></Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  }
})
