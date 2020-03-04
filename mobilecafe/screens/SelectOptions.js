import React from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { StackActions } from '@react-navigation/native';

import DisplaySelectOptions from '../components/DisplaySelectOptions';
import { addOption, removeOption, addCartEntryMiddleware } from '../redux';

const SelectOptions = ({navigation}) => {
  const selectedItem = useSelector(store => store.selectedItem);
  const options = useSelector(store => store.options);
  const selectedOptions = useSelector(store => store.selectedOptions);

  const dispatch = useDispatch();

  let data = [];
  options.forEach(option => {
    if(selectedItem.options.includes(option.pk)) data.push(option)
  })

  const title="Select Options";

  const processSelection = (item) => {
    selectedOptions.includes(item) ? dispatch(removeOption(item)) : dispatch(addOption(item))
  }

  const processAddOptions = () => {
    if(selectedItem.bread_type.length > 0) {
      navigation.navigate("SelectBread")
    } else {
      dispatch(addCartEntryMiddleware());
      navigation.dispatch(StackActions.popToTop());
      navigation.navigate("Summary");
    }
  }

  return(
    <DisplaySelectOptions title={title} data={data} processSelection={processSelection} optionPage={true} processAddOptions={processAddOptions} selectedOptions={selectedOptions} navigation={navigation} />
  )
}

export default SelectOptions
