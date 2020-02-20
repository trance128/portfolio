/* Redux Reducers.

*/

import { RESET, TOGGLE_WORK, START, PAUSE, UNPAUSE, SET_ENDTIME,
          SET_TIME_REMAINING , UPDATE_SETTINGS, SHOW_OPTIONS, HIDE_OPTIONS
        } from './actions.js';
import { initialData } from './initialData';

export default function(storeData = initialData, action) {
  switch(action.type){
    case UPDATE_SETTINGS:
      return {
        ...storeData,
        settings: action.payload,
      }
    case TOGGLE_WORK:
      return {
        ...storeData,
        work: !storeData.work,
      }
    case RESET:
      return {
        ...storeData,
        work: true,
        started: false,
        paused: false,
      }
    case START: {
      return {
        ...storeData,
        started: true,
        paused: false,
        startTimestamp: action.payload,
      }
    }
    case UNPAUSE: {
      return{
        ...storeData,
        started: true,
        startTimestamp: action.payload,
        paused: false,
      }
    }
    case SET_TIME_REMAINING: {
      return {
        ...storeData,
        timeRemaining: action.payload,
      }
    }
    case SET_ENDTIME: {
      return {
        ...storeData,
        endTimestamp: action.payload,
      }
    }
    case PAUSE: {
      return {
        ...storeData,
        started: false,
        paused: true,
      }
    }
    case SHOW_OPTIONS: {
      return {
        ...storeData,
        showOptions: true
      }
    }
    case HIDE_OPTIONS: {
      return {
        ...storeData,
        showOptions: false,
      }
    }
    default:
      return storeData;
  }
}
