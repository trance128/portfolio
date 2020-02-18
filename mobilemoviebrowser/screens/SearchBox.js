/*  Search Box.  Displays form for movie title and submit button */

import React from 'react';
import { connect } from 'react-redux';
import { setTitle, apiSearchTitle } from '../store'
import { TouchableHighlight, View, StyleSheet, TextInput, Text } from 'react-native';
import Constants from 'expo-constants';

// necessary redux functions
const mapStateToProps = storeData => ({
  title: storeData.title,
});

const mapDispatchToProps = {
  setTitle,
  apiSearchTitle,
}

class unconnectedSearchBox extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      title: "", // Search text defined in class as it's only used in this component
    }
  }

  // handles update of title text in search box
  handleChange = (event) => {
    this.setState({
      title: event.nativeEvent.text,
    })
  }

  // upon form submit, dispatch two actions and load next page
  submitForm = (evt) => {
    evt.preventDefault();
    this.props.setTitle(this.state.title);
    this.props.apiSearchTitle(this.state.title);
    this.props.navigation.navigate('SearchResult')
  }

  // similar to web implementation, with button changed for TouchableHighlight etc
  render() {
    return(
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChange={this.handleChange}
          placeholder={this.props.title || "Title" }
          />

        <TouchableHighlight
          style={styles.button}
          onPress={this.submitForm}>
          <Text style={styles.buttonText}>
            Search
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

// connect state, dispatch, component -- removed withRouter, as we're using RN Navigation
export const SearchBox = connect(mapStateToProps, mapDispatchToProps)(unconnectedSearchBox);

// styles for this component
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 5,
    paddingLeft: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00008b',
    margin: 5,
    width: 320,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00008b',
    borderRadius: 10,
    padding: 7,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    width: 100,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
})
