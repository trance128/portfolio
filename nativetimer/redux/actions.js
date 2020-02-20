// Actions and action creators.  Since the project is small, I've used a single file for both.

export const TOGGLE_WORK = "toggle_work";
export const RESET = "reset";
export const START = "start";
export const UPDATE_SETTINGS = "update_settings";
export const SET_TIME_REMAINING = "set_time_remaining";
export const SET_ENDTIME = "set_endtime";
export const UNPAUSE = "unpause";
export const PAUSE = "pause";
export const SHOW_OPTIONS = "show_options";
export const HIDE_OPTIONS = "hide_options"

export const pause = () => {
  return {
    type: PAUSE,
  }
}

export const unpause = (timestamp) => {
  return {
    type: UNPAUSE,
    payload: timestamp,
  }
}

export const setTimeRemaining = (timestamp) => {
  return {
    type: SET_TIME_REMAINING,
    payload: timestamp,
  }
}

export const setEndTimestamp = (timestamp) => {
  return{
    type: SET_ENDTIME,
    payload: timestamp,
  }
}

export const updateSettings = (settings) => {
  return {
    type: UPDATE_SETTINGS,
    payload: settings,
  }
}

export const toggleWork = () => {
  return {
    type: TOGGLE_WORK,
  }
}

export const reset = () => {
  return {
    type: RESET,
  }
}

export const start = (timestamp) => {
  return {
    type: START,
    payload: timestamp,
  }
}

export const showOptions = () => {
  return {
    type: SHOW_OPTIONS,
  }
}

export const hideOptions = () => {
  return {
    type: HIDE_OPTIONS,
  }
}
