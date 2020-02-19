// footer, displays link for options, reset and pause; along with dispatching necessary actions

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo, faSlidersH, faPause } from '@fortawesome/free-solid-svg-icons'
import { reset, pause } from './store/actions';
import { completeUnpause } from './store/middleware';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapStateToProps = storeData => ({
  paused: storeData.paused,
})

const mapDispatchToProps = {
  reset,
  pause,
  completeUnpause,
}

class unconnectedFooter extends React.Component {
    // what to do if options is selected; pauses timer + pushes to new page
    openOptions = () => {
      this.props.pause();
      this.props.history.push("/options")
    }

    // function for handling reset button
    reset = () => {
      this.props.reset();
    }

    // pause / unpause function
    pause = () => {
      if(!this.props.paused){
        this.props.pause()
      } else {
        this.props.completeUnpause(Date.now())
      }
    }

    // rendering 3 symbols at bottom
    render(){
      return(
        <div className="container-2">
          <div className="container-3" onClick={this.openOptions}>
            <FontAwesomeIcon icon={faSlidersH} className="footerItem"/>
            <p className="footerItem">Settings</p>
          </div>

          <div className="container-3" onClick={this.pause}>
            <FontAwesomeIcon icon={faPause} className="footerItem" />
            <p className="footerItem">Pause</p>
          </div>

          <div className="container-3" onClick={this.reset}>
            <FontAwesomeIcon icon={faRedo} className="footerItem"/>
            <p className="footerItem">Reset</p>
          </div>
        </div>
      )
    }
}

// connecting props, dispatch and component with router
export const Footer = withRouter(connect(mapStateToProps, mapDispatchToProps)(unconnectedFooter));
