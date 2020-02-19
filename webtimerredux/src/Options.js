// Displays the options, allowing custom times

import React from 'react';
import { connect } from 'react-redux';
import { FormSegment } from './FormSegment';
import { updateSettings, reset } from './store/actions';
import { Link } from 'react-router-dom';

const mapStateToProps = storeData => ({
  workMinutes: storeData.settings.workMinutes,
  workSeconds: storeData.settings.workSeconds,
  breakMinutes: storeData.settings.breakMinutes,
  breakSeconds: storeData.settings.breakSeconds,
})

const mapDispatchToProps = {
  updateSettings,
  reset,
}

class unconnectedOptions extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      formData: [ // declaring formData in state so that we can map into a component
        {name: "Work Time Minutes", value:this.props.workMinutes, type:"number", callback:this.updateFormValue},
        {name: "Work Time Seconds", value:this.props.workSeconds, type:"number", callback:this.updateFormValue},
        {name: "Break Time Minutes", value:this.props.breakMinutes, type:"number", callback:this.updateFormValue},
        {name: "Break Time Seconds", value:this.props.breakSeconds, type:"number", callback:this.updateFormValue},
      ],
      "Work Time Minutes": this.props.workMinutes,
      "Work Time Seconds": this.props.workSeconds,
      "Break Time Minutes": this.props.breakMinutes,
      "Break Time Seconds": this.props.breakSeconds,
    }
  }

  updateFormValue = (event) => {
    let empty = false;
    if(event.target.value === "") empty = true; // empty vals changed to 0
    this.setState({ [event.target.name]: ( empty ? 0 : event.target.value ) });
  }

  // when sending data, also reset the timer and redirect to timer
  sendData = () => {
    this.props.updateSettings({
      workMinutes: this.state["Work Time Minutes"],
      workSeconds: this.state["Work Time Seconds"],
      breakMinutes: this.state["Break Time Minutes"],
      breakSeconds: this.state["Break Time Seconds"],
    })
    this.props.reset();
    this.props.history.push("/app");
  }

  render() {
    return (
      <>
        <div className="headerOptions item"><h2>Settings</h2></div>
        <div className="container-4">
          { // using FormSegment to programatically create form
            this.state.formData.map((obj) => <FormSegment name={obj.name} placeholder={obj.value} type={obj.type} callback={obj.callback} /> )
          }
          <div className="container-2">
            <button className="btn btn-secondary btn-sm" onClick={this.sendData}>Save</button>
            <Link to="/app">
              <button className="btn btn-secondary btn-sm">Cancel</button>
            </Link>
          </div>
        </div>
      </>
    )
  }
}

export const Options = connect(mapStateToProps, mapDispatchToProps)(unconnectedOptions);
