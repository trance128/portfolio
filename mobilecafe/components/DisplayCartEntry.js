/*
Component to display individual cart entries
Displays Main Item + bread, followed by Individual rows for options / bread
*/

import React from 'react';
import { View, Text } from 'react-native';

import styles from '../styles';

const DisplayCartEntry = (props) => {
  return(
    <View style={styles.summaryContainer}>
      <View style={styles.summaryItemRow}>
        <View style={styles.summaryItem}>
          <Text style={styles.mainText}>{props.itemName}</Text>
        </View>
        <View style={styles.summaryPrice}>
          <Text style={styles.mainText}>£{props.price.toFixed(2)}</Text>
        </View>
      </View>
      {
        props.options.map(option => (
          <View key={option.name} style={styles.summaryOptionRow}>
            <Text style={styles.summaryOptionText}>{option.name}</Text>
          </View>
        ))
      }
      {
        props.bread &&
        <View style={styles.summaryOptionRow}>
          <Text style={styles.summaryOptionText}>{props.bread.name}</Text>
        </View>
      }

    </View>
  )
}

export default DisplayCartEntry
