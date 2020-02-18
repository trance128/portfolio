/* Actions and Action creators.  A single file used as this project is quite small.
We could opt to separate this file into two, or even three with the middleware being
contained in it's own file. */

import { searchTitle, searchDetails } from '../api';

export const SET_TITLE = "SET_TITLE"
export const SET_ID = "SET_ID"
export const SET_PAGE = "SET_PAGE"
export const SEARCH_REQ_SENT = "SEARCH_REQ_SENT"
export const TITLE_REQ_FULFILLED = "TITLE_REQ_FULFILLED"
export const SEARCH_FAILED = "SEARCH_FAILED"
export const DETAILS_REQ_SENT = "DETAILS_REQ_SENT"
export const DETAILS_REQ_FULFILLED = "DETAILS_REQ_FAILED"
export const DETAILS_REQ_FAILED = "DETAILS_REQ_FAILED"

export const setTitle = (title) => ({
  type: SET_TITLE,
  payload: title,
})

export const setId = (id) => ({
  type: SET_ID,
  payload: id,
})

// async thunk action creator, using API search title function to get movies that match said title
// in a larger project this should be separated into actions and middleware, but as this
// project is small I opted not to
export const apiSearchTitle = (title, page = 1) => async dispatch => {
  dispatch({ type: SEARCH_REQ_SENT })
  try {
    const res = await searchTitle(title, page)
    dispatch({type: TITLE_REQ_FULFILLED, payload: res})
    dispatch({type: SET_TITLE, payload: title})
    dispatch({type: SET_PAGE, payload: page})
  } catch (err) {
    dispatch({type: SEARCH_FAILED, payload: err})
  }
}

export const apiSearchDetails = (id) => async dispatch => {
  dispatch({ type: DETAILS_REQ_SENT })
  try {
    const res = await searchDetails(id)
    dispatch({ type: DETAILS_REQ_FULFILLED, payload: res })
  } catch (err) {
    dispatch({ type: DETAILS_REQ_FAILED, payload: err })
  }
}
