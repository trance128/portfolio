/*
Functions that expand on Actions
Uses thunk
*/

import { start, setTimeRemaining, setEndTimestamp, unpause } from './actions';

export const completeStart = (timestamp) => (dispatch, getState) => {
  let startTimestamp = Math.floor(timestamp / 1000);
  let endTimestamp, timeRemaining;
  let {work, settings} = getState();

  if(work){
    timeRemaining = (settings.workMinutes * 60) + Number(settings.workSeconds);
  } else {
    timeRemaining = (settings.breakMinutes * 60) + Number(settings.breakSeconds);
  }

  endTimestamp = startTimestamp + timeRemaining

  dispatch(start(startTimestamp))
  dispatch(setEndTimestamp(endTimestamp))
  dispatch(setTimeRemaining(timeRemaining))
}

export const completeUnpause = (timestamp) => (dispatch, getState) => {
  let startTimestamp = Math.floor(timestamp / 1000);
  let { timeRemaining } = getState();

  dispatch(unpause(startTimestamp))
  dispatch(setEndTimestamp(timeRemaining + startTimestamp))
}
