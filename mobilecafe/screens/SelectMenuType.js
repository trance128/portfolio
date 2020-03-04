/*
Initially I had all select screens in a single screen, but it caused lag in my app.
*/

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectMenuType, selectItemType } from '../redux';
import DisplaySelectOptions from '../components/DisplaySelectOptions';

const SelectMenuType = (props, {navigation}) => {
  const menuTypes = useSelector(store => store.menuTypes);
  const data = menuTypes;
  const title="Select MenuType"

  const dispatch = useDispatch();

  const processSelection = (item) => {
    dispatch(selectMenuType(item));
    dispatch(selectItemType(-1));
    props.navigation.navigate("SelectItemType");
  }

  return (
    <DisplaySelectOptions title={title} data={data} processSelection={processSelection} navigation={props.navigation} homePage={true} />
  )
}

export default SelectMenuType;
