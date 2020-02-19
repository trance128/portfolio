// Play Component, displays the play button and dispatches start / unpause middleware when clicked

import React from 'react';
import { connect } from 'react-redux';
import { completeStart, completeUnpause } from './store/middleware';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'

const mapStateToProps = storeData => ({
  paused: storeData.paused,
})

const mapDispatchToProps = {
  completeStart,
  completeUnpause,
}


class unconnectedPlay extends React.Component {
  // if we've paused, unpause -- otherwise, start a new timer
  play = () => {
    this.props.paused ? this.props.completeUnpause(Date.now()) : this.props.completeStart(Date.now());
  }

  render() {
    return(
      <div onClick={this.play}>
        <FontAwesomeIcon icon={faPlayCircle} size="2x" />
      </div>
    )
  }
}

export const Play = connect(mapStateToProps, mapDispatchToProps)(unconnectedPlay);
