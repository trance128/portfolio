/* Redux reducers. Nothing unusual here, reducers are all compact */

import { SET_TITLE, SET_ID, SEARCH_REQ_SENT,
    SEARCH_FAILED, TITLE_REQ_FULFILLED, SET_PAGE,
    DETAILS_REQ_SENT, DETAILS_REQ_FAILED, DETAILS_REQ_FULFILLED,
    } from './actions';
import { initialData } from './initialData';

const SENT = "Sent";
const FULFILLED = "Fulfilled";
const FAILED = "Failed";

export default function(storeData = initialData, action){
  switch(action.type) {
    case SET_TITLE:
      return {
        ...storeData,
        title: action.payload,
      }
    case SET_ID:
      return {
        ...storeData,
        id: action.payload,
      }
    case SET_PAGE:
      return {
        ...storeData,
        page: action.payload,
      }
    case SEARCH_REQ_SENT:
      return {
        ...storeData,
        request: SENT
      }
    case TITLE_REQ_FULFILLED:
      return {
        ...storeData,
        request: FULFILLED,
        titleResult: action.payload.Search,
        totalResults: action.payload.totalResults,
      }
    case SEARCH_FAILED:
      return {
        ...storeData,
        request: FAILED,
        error: action.payload,
      }
    case DETAILS_REQ_SENT:
      return {
        ...storeData,
        detailsRequest: SENT,
      }
    case DETAILS_REQ_FULFILLED:
      return {
        ...storeData,
        movieDetails: action.payload,
        detailsRequest: FULFILLED,
      }
    case DETAILS_REQ_FAILED:
      return {
        ...storeData,
        detailsRequest: FAILED,
      }
    default:
      return storeData
  }
}
