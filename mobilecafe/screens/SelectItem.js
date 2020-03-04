import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StackActions } from '@react-navigation/native';

import DisplaySelectOptions from '../components/DisplaySelectOptions';
import {selectItem, resetOptions, selectBread, addCartEntryMiddleware} from '../redux';

const SelectItem = ({navigation}) => {
  const selectedItemType = useSelector(store => store.selectedItemType);
  const menuItems = useSelector(store => store.menuItems);

  const dispatch = useDispatch();

  let data = [];
  menuItems.forEach(item => {
    if(item.type === selectedItemType.pk) data.push(item)
  })

  const title="Select Main Item";

  const processSelection = (item) => {
    dispatch(selectItem(item));
    dispatch(resetOptions());
    dispatch(selectBread(-1));
    if(item.options.length > 0) {
      navigation.navigate("SelectOptions");
    } else {
      if(item.bread_type.length > 0) {
        navigation.navigate("SelectBread");
      } else {
        dispatch(addCartEntryMiddleware());
        navigation.dispatch(StackActions.popToTop());
        navigation.navigate("Summary");
      }
    }
  }

  return(
    <DisplaySelectOptions title={title} data={data} processSelection={processSelection} navigation={navigation} />
  )
}

export default SelectItem
