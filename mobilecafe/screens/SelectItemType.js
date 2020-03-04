import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import { selectItemType, selectItem } from '../redux';
import DisplaySelectOptions from '../components/DisplaySelectOptions';

const SelectItemType = ({route, navigation}) => {
  const selectedMenuType = useSelector(store => store.selectedMenuType);
  const itemTypes = useSelector(store => store.itemTypes);

  const dispatch = useDispatch();

  // getting only relevant item Types
  let data = [];
  itemTypes.forEach(itemType => {
    if(itemType.menu_type === selectedMenuType.pk) data.push(itemType)
  })

  const title = "Select Item Category";

  const processSelection = (item) => {
    dispatch(selectItemType(item));
    dispatch(selectItem(-1));
    navigation.navigate("SelectItem");
  }

  return(
    <DisplaySelectOptions title={title} data={data} processSelection={processSelection} navigation={navigation} />
  )
}

export default SelectItemType
