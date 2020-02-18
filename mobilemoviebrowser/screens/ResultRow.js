/*
Row component.
Similar to web implementation, however setID and apiSearchDetails has been moved here
from Details page, as previously ID was transferred through URL.
 */

import React from 'react';
import { TouchableHighlight, Text, StyleSheet, View } from 'react-native';
import { useDispatch } from "react-redux";

import { setId, apiSearchDetails } from '../store';

export const ResultRow = (props) => {
  const dispatch = useDispatch();

  const setIdNavigate = (id) => {
    dispatch(setId(id))
    dispatch(apiSearchDetails(id))
    props.navigation.navigate('Details')
  }

  return (
    <TouchableHighlight onPress={() => setIdNavigate(props.imdbID)} style={styles.item}>
      <View style={styles.hr}>
        <Text style={styles.text}>{props.Title}</Text>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  item: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
  hr: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    padding: 2
  }
})
