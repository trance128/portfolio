/*
Displays options we need to select for an item, such as options or type of bread
*/

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import BtnMaker from './BtnMaker';
import styles from '../styles';
import {addOption, removeOption, selectBread}  from '../store';

const DisplayItemOptions = (props) => {
  // getting relevant store Data
  const options = useSelector(store => store.options)
  const bread = useSelector(store => store.breadTypes)
  const selectedOptions = useSelector(store => store.selectedOptions);
  const selectedBread = useSelector(store => store.selectedBread);

  const dispatch = useDispatch();

  let selection;
  if(props.type === "options") selection = options
  if(props.type === "bread") selection = bread

  // decides what to display
  let displaySelection = [];
  selection.forEach(option =>{
    if(props.array.includes(option.pk)) displaySelection.push(option)
  })

  // adds selected options to state
  const addRemoveOptionCallback = (optionId) => {
    // if option in selected options, remove it; otherwise add it
    if(selectedOptions.length > 0){
      selectedOptions.includes(optionId) ? dispatch(removeOption(optionId)) : dispatch(addOption(optionId))
    } else {
      dispatch(addOption(optionId))
    }
  }

  // add pressed bread to store as selected bread
  const selectBreadCallback = (breadId) => {
    dispatch(selectBread(breadId))
  }

  const callback = (id) => {
    props.type === "options" ? addRemoveOptionCallback(id) : selectBreadCallback(id)
  }

  const isItSelected = (id) => {
    if(props.type === "options"){
      return selectedOptions.includes(id)
    } else {
      return id === selectedBread
    }
  }

  return (
    <React.Fragment>
      {
        displaySelection.map((option, index) => <BtnMaker
          key={index}
          index={index}
          obj={option}
          callback={() => callback(option.pk)}
          type="centerBar"
          selected={isItSelected(option.pk)}
        />)}
      <hr style={styles.hr}/>
    </React.Fragment>
  )
}

export default DisplayItemOptions
