/* Search Result Page.

Displays search box at the top so we can -change our search, then uses row Component
to display results (10 at a time, as 10 are given from API), and finally
pagination at the bottom if applicable

Most of the code is the same as web implementation, and of course the render
method had to be rewritten using React Native components; additionally,
navigation had to be updated
*/

import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableHighlight, Text, StyleSheet, FlatList } from 'react-native';

import { apiSearchTitle } from '../store';
import { ResultRow } from './ResultRow';
import { SearchBox } from './SearchBox';

// necessary redux functions, mapStateToProps and mapDispatchToProps
const mapStateToProps = storeData => ({
  titleResult: storeData.titleResult,
  totalResults: storeData.totalResults,
  page: storeData.page,
  title: storeData.title,
});

const mapDispatchToProps = {
  apiSearchTitle,
};

class unconnectedSearchResult extends React.Component {
  // functions to get the next and previous pages of search, as API provides 10
  // at a time only
  nextPage = () => {
    this.props.apiSearchTitle(this.props.title, (this.props.page + 1))
  }
  // as per above
  prevPage = () => {
    this.props.apiSearchTitle(this.props.title, (this.props.page - 1))
  }

  render() {
    return(
      <View style={styles.containerLarge}>
        <View style={styles.containerHeader}>
          <Text style={styles.mainText}>Movie Search</Text>
          <SearchBox navigation={this.props.navigation} />
        </View>

        <View style={styles.containerMid}>
          {
            typeof(this.props.titleResult) === "object" &&
                <FlatList
                data={this.props.titleResult}
                renderItem={({item}) => <ResultRow Title={item.Title} imdbID={ item.imdbID } navigation={this.props.navigation} /> }
                keyExtractor={(item, index) => index.toString()}
                />
          }
          {
            typeof(this.props.titleResult) !== "object" &&
              <Text>No Result Found</Text>
          }
        </View>

        <View style={styles.containerBot}>
          {
            (this.props.totalResults > 9) &&
            <View style={styles.containerBot}>
              <View style={styles.space}>
              </View>
              <View style={styles.bot}>
                { this.props.page > 1 &&
                    <TouchableHighlight onPress={this.prevPage} style={styles.button}>
                      <Text>Prev</Text>
                    </TouchableHighlight>
                }
              </View>
              <View style={styles.bot}>
                <Text>Page {this.props.page}</Text>
              </View>
              <View style={styles.bot}>
                {
                  this.props.page < ( this.props.totalResults / 10 ) &&
                  <TouchableHighlight onPress={this.nextPage} style={styles.button}>
                    <Text>Next</Text>
                  </TouchableHighlight>
                }
              </View>
              <View style={styles.space}>
              </View>
            </View>
          }
        </View>
      </View>
    )
  }
}

// connect component with state, dispatch from redux store
export const SearchResult = connect(mapStateToProps, mapDispatchToProps)(unconnectedSearchResult);

const styles = StyleSheet.create({
  containerHeader: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    flex: 2.5,
  },
  containerMid: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 6,
  },
  containerBot: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  containerLarge: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  mainText: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 5,
    color: '#333333',
  },
  space: {
    flex: 1,
  },
  bot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 15,
  }
})
