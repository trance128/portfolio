/*  Search Box.  Displays form for movie title and submit button */

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setTitle, apiSearchTitle } from './store'

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
      title: event.target.value,
    })
  }

  // upon form submit, dispatch two actions and load next page
  submitForm = (evt) => {
    evt.preventDefault();
    this.props.setTitle(this.state.title);
    this.props.apiSearchTitle(this.state.title);
    this.props.history.push("/res")
  }

  render() {
    return(
      <React.Fragment>
        <form className="form-group" onSubmit={this.submitForm}>
          <input className="form-control"
            name="Title"
            placeholder= {this.props.title || "Title"} // if we're on results page, display
                                                       // the movie we searched as placeholder
            type="text"
            onChange={this.handleChange} />
          <button className="btn btn-primary" type="submit">Search</button>
        </form>
      </React.Fragment>
    )
  }
}

// connect state, dispatch, component, router 
export const SearchBox = withRouter(connect(mapStateToProps, mapDispatchToProps)(unconnectedSearchBox));
