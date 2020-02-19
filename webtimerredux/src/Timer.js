/*
Timer, displays minutes : seconds, and counts down as appropriate
*/

import React from 'react';
import './stylesheets.css';
import { connect } from 'react-redux';
import { setTimeRemaining, toggleWork } from './store/actions';
import { completeStart } from './store/middleware';

const mapStateToProps = storeData => ({
  endTimestamp: storeData.endTimestamp,
})

const mapDispatchToProps = {
  setTimeRemaining,
  toggleWork,
  completeStart,
}

class unconnectedTimer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      minutes: "", // minutes and seconds declared in state as they're only used for
      seconds: "", // presentation
    }
  }

  componentDidMount() {
    this.updateTime(); // set correct time at beginning, then auto refreshes
    this.timerInterval = setInterval(this.updateTime, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval)
  }

  // calculates time remaining in case of JS Interval lag, updates it in store,
  // sets local state with time remaining in minutes:seconds
  updateTime = () => {
    let p = this.props;
    let currentTime = Math.floor(Date.now() / 1000)
    let timeRemaining = p.endTimestamp - currentTime;

    this.props.setTimeRemaining(timeRemaining);

    this.setState({
      seconds: timeRemaining % 60,
      minutes: (timeRemaining > 60 ? Math.floor(timeRemaining / 60) : 0),
    })

    // if timer ran out, toggle work / break and restart the timer
    if(timeRemaining <= 0){
      p.toggleWork();
      p.completeStart(Date.now());
    }
  }

  // render function
  render(){
    return(
      <React.Fragment>
        <div>{ `${this.state.minutes}:${(this.state.seconds < 10 ? "0" : "")}${this.state.seconds}` }</div>
      </React.Fragment>
    )
  }
}

// connecting state, dispatch and component
export const Timer = connect(mapStateToProps, mapDispatchToProps)(unconnectedTimer);
