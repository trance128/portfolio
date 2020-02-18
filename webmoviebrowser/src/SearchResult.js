/* Search Result Page.

Displays search box at the top so we can -change our search, then uses row Component
to display results (10 at a time, as 10 are given from API), and finally
pagination at the bottom if applicable
*/

import React from 'react';
import { connect } from 'react-redux';
import { apiSearchTitle } from './store';
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
    this.props.history.push(`/res/${this.props.page}`)
  }
  // as per above
  prevPage = () => {
    this.props.apiSearchTitle(this.props.title, (this.props.page - 1))
    this.props.history.push(`res/${this.props.page}`)
  }

  render(){
    return(
      <div className="container-1">
        { // header
        }
        <div className="space-1 container-2">
            <h1>Movie Search</h1>
            <SearchBox />
        </div>
        <hr />
        <div className="space-7">
        {
          // mapping over the result, which is stored as an object, passing each into ResultRow for rendering
        }
        { typeof(this.props.titleResult) === "object" &&
         Object.keys(this.props.titleResult).map((key) => <ResultRow Title={ this.props.titleResult[key].Title } imdbID={ this.props.titleResult[key].imdbID } />)
        }
        {
          // basic error handling
        }
        { typeof(this.props.titleResult) !== "object" &&
          <h4>No Result Found</h4>
        }
        </div>

        {
          // pagination.  Only displayed if needed, same with Next / Prev buttons -- only
          // display each if applicable
        }
        <div className="space-1">
          { (this.props.totalResults > 9) &&
            <div className="container-4 m-2">
              { this.props.page > 1 &&
                <div className="m-2" onClick={this.prevPage}>Prev Page</div>
              }
              <div className="m-2">Page {this.props.page}</div>
              { this.props.page < ( this.props.totalResults / 10) &&
              <div className="m-2" onClick={this.nextPage}>Next Page</div>
              }
            </div>
          }
        </div>

      </div>
    )
  }
}

// connect component with state, dispatch from redux store
export const SearchResult = connect(mapStateToProps, mapDispatchToProps)(unconnectedSearchResult);
