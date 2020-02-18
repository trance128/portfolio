/* Row component */

import React from 'react';
import {Link} from 'react-router-dom';

export const ResultRow = (props) => {

  return(
    <React.Fragment>
      <Link to={`/details/${props.imdbID}`}>{props.Title}</Link>
      <hr />
    </React.Fragment>
  )
}
