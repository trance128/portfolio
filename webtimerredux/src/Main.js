/* Main render function, organizes our components */

import React from 'react';
import './stylesheets.css';
import { Timer } from './Timer';
import { Play } from './Play';
import { Footer } from './Footer';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Options } from './Options';

const mapStateToProps = storeData => ({
  started: storeData.started,
  work: storeData.work,
})

class unconnectedMain extends React.Component {
  // app and footer turned into functions to clean up code in render function 
  app = () => {
    return(
      <React.Fragment>
        <div className="item header">{ this.props.started ? (this.props.work ? `Work` : `Break`) : `Press Play to Start`}</div>
        <div className="item middle title">
          { this.props.started ? <Timer /> : <Play /> }
        </div>
      </React.Fragment>
    )
  }

  footer = () => {
    return(
      <div className="item bottom">
        <Footer />
      </div>
    )
  }

  render() {
    return(
      <div className="container-1">
        <Router>
            <Route path="/app" render={this.app} />
            <Route path="/options" component={Options} />
            <Redirect from="/" to="/app" />
            <Route path="/" render={this.footer} />
        </Router>
      </div>
    )
  }
}

export const Main = connect(mapStateToProps)(unconnectedMain);
