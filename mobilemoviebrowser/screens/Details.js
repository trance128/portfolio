/*
Details page.  This page displays the details of the movies users queried.
As this app is a demonstration, this page only has essential details

Largely the same as web implementaiton, however, apiSearchDetails was moved to
ResultRow
*/

import React from 'react';
import { View, Image, Text, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

// necessary redux functions
const mapStateToProps = storeData => ({
  movieDetails: storeData.movieDetails,
})

class unconnectedDetails extends React.Component {
  render() {
    let movie = this.props.movieDetails   // shorthand
    return (
      <View style={styles.container}>
        <View style={styles.containerImage}>
          <Image
            source={{ uri: movie.Poster }}
            style={styles.thumbnail} />
        </View>
        <Text style={styles.title}>{movie.Title}</Text>
        <View style={styles.container100}>
          <Text style={styles.container101}>{movie.Rated}, {movie.Runtime}</Text>
          <Text style={styles.container102}>{movie.Year}</Text>
        </View>
        <Text style={styles.plot}>{movie.Plot}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container100: {
    flexDirection: 'row',
    marginBottom: 10,
    fontSize: 18,
    backgroundColor: '#ffffff',
    color: '#333',
  },
  container101: {
    flex: 1,
    justifyContent: 'flex-start',
    marginLeft: 20,
    backgroundColor: '#ffffff',
    color: '#333',
  },
  container102: {
    flex: 1,
    textAlign: 'right',
    marginRight: 20,
    backgroundColor: '#ffffff',
    color: '#333',
  },
  container200: {
    margin: 20,
    backgroundColor: '#ffffff'

  },
  containerImage: {
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  thumbnail: {
    width: 200,
    height: 311,
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    backgroundColor: '#ffffff'
  },
  plot: {
    fontStyle: 'italic',
    marginLeft: 10,
    backgroundColor: '#ffffff',
    color: '#333',
  }
});


export const Details = connect(mapStateToProps)(unconnectedDetails);
