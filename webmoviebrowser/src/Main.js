/* Main Display Component.  Has a router that chooses what to display */

import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { SearchBox } from './SearchBox';
import { SearchResult } from './SearchResult';
import { Details } from './Details';

export default class extends React.Component {
  // Since index seemed too small for a dedicated component, I separated it in a function
  // to keep the render function looking neat
  index = () => {
    return (
      <div className="text-center container-1">
        <div className="container-2 space-2">
          <h1>Movie Search</h1>
          <SearchBox />
        </div>
        <div className="space-1"></div>
      </div>
    )
  }

  render() {
    return(
      <Router>
        <Route path="/index" render={this.index} />
        <Route path="/res/:title?" component={SearchResult}/>
        <Route path="/Details/:id" component={Details} />
        <Redirect from="/" to="/index" />
      </Router>
    )
  }
}
