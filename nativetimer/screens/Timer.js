/*
Timer, displays minutes : seconds, and counts down as appropriate
*/

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector, batch } from 'react-redux';

import { setTimeRemaining, toggleWork, completeStart } from '../redux'

export default function Timer( props ){
  // getting redux state data using hooks
  const endTimestamp = useSelector(state => state.endTimestamp);
  const paused = useSelector(state => state.paused);
  const started = useSelector(state => state.started);
  const work = useSelector(state => state.work);

  // getting redux dispatch using hooks, and binding actions
  const dispatch = useDispatch();
  const boundSetTimeRemaining = (timestamp) => dispatch(setTimeRemaining(timestamp));
  const boundToggleWork = () => dispatch(toggleWork());
  const boundStart = () => dispatch(completeStart(Date.now()));

  // declaring state data, used only for presentation in this component
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  // useEffect, (re)starts the timer every time the component rerenders, clears
  // interval when component unmounted

  useEffect(() => {
    updateTime();

    // using 250 as seconds skip when on 1000
    const timerInterval = setInterval(() => updateTime(), 250);

    // cleanup
    return () => clearInterval(timerInterval);
  });

  // calculates time remaining in case of JS Interval lag, updates it in store
  // sets local state with time remaining in minutes:seconds
  updateTime = () => {
    let currentTime = Math.floor(Date.now() / 1000)
    let timeRemaining = endTimestamp - currentTime;

    // if timer ran out, toggle work / break and restart the timer
    if(timeRemaining <= 0){
      batch(() => {
        boundToggleWork();
        boundStart();
      })
    }

    boundSetTimeRemaining(timeRemaining);

    // update presentational state
    setMinutes(timeRemaining > 60 ? Math.floor(timeRemaining / 60) : 0)
    setSeconds(timeRemaining % 60)
  }

  // rendering
  return(
    <View style={styles.container}>
      <View style={styles.s1}>
        <Text style={styles.messageText}>{ work ? "Work" : "Break" }</Text>
      </View>
      <View style={styles.s2}>
        <Text style={styles.text}>{ `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}` }</Text>
      </View>
      <View style={styles.s1}>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 72,
  },
  messageText: {
    color: '#fff',
    fontSize: 25,
  },
  s1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  s2: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
