import React from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { StackActions } from '@react-navigation/native';

import DisplaySelectOptions from '../components/DisplaySelectOptions';
import { selectBread, addCartEntryMiddleware } from '../redux';

const SelectBread = ({navigation}) => {
  const selectedItem = useSelector(store => store.selectedItem);
  const breadTypes = useSelector(store => store.breadTypes);

  const dispatch = useDispatch();

  let data = [];

  breadTypes.map(bread => {
    if(selectedItem.bread_type.includes(bread.pk)) data.push(bread)
  });

  const title="Select Bread Type";

  const processSelection = (item) => {
    batch(() => {
      dispatch(selectBread(item));
      dispatch(addCartEntryMiddleware());
    })
    navigation.dispatch(StackActions.popToTop());
    navigation.navigate("Summary");
  }

  return(
    <DisplaySelectOptions title={title} data={data} processSelection={processSelection} navigation={navigation}/>
  )
}

export default SelectBread
