/* Main Display / Home Screen for Native */

import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { SearchBox } from './SearchBox';

export class Home extends React.Component {
  render() {
    return(
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.container}>
          <Text style={styles.mainText}>Movie Search</Text>
          <SearchBox navigation={this.props.navigation} />
        </View>
        <View style={styles.spaceHalf}>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  mainText: {
    fontSize: 36,
    fontWeight: 'bold',
    margin: 20,
    color: '#333333',
  },
  spaceHalf: {
    flex: 0.5,
  }
})
