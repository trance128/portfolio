// Expanding on Actions

import {
  MENUITEMS, ITEMTYPES, MENUTYPES, OPTIONS, ADDONS, BREADTYPES, ERROR,
  storeData, dataFailed, dataLoaded
 } from './actions';

export const loadInitialData = () => async dispatch => {
  // names of data we're loading
  const data_types = [MENUITEMS, ITEMTYPES, MENUTYPES, OPTIONS, ADDONS, BREADTYPES]
  let result = []
  try {
    // iterates over the data types, fetching data for each and adding to result
    for( let i = 0; i < data_types.length; i++) {
      result[i] = await fetch(`api/${data_types[i]}/?format=json`)

      if (result[i].status > 400) { // in case of error, dispatch failure
        dispatch(dataFailed())      // this will lead to reload data
      }

      const data = await result[i].json()
      dispatch(storeData(data, data_types[i])) // stores data in redux, passing i so we know which
      dispatch(dataLoaded())
    }
  } catch (err) {
    dispatch({type: ERROR, payload: err}) // more error checking
  }
}
