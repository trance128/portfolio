/* Details page.  This page displays the details of the movies users queried.
As this app is a demonstration, this page only has essential details  */

import React from 'react';
import { connect } from 'react-redux';
import { apiSearchDetails } from './store'

// necessary redux functions
const mapStateToProps = storeData => ({
  movieDetails: storeData.movieDetails,
})

const mapDispatchToProps = {
  apiSearchDetails,
}

class unconnectedDetails extends React.Component {
  // load the details of the movie
  componentDidMount(){
    this.props.apiSearchDetails(this.props.match.params.id)
  }

  render() {
    let movie = this.props.movieDetails   // shorthand
    return(
      <div className="container-1">
        <div className="container-3">
          <div className="container-2 text-center space-1 m-3">
            <img alt="Movie Poster" src={movie.Poster} />
          </div>
          <div className="space-3 m-3">
            <h1>{ movie.Title }</h1>
            <p>{movie.Plot}</p>
          </div>
        </div>
      </div>
    )
  }
}

export const Details = connect(mapStateToProps, mapDispatchToProps)(unconnectedDetails);
