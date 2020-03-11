/*
Left Side Bar for use in Home Page.
Displays buttons for Item Types -- Categories of Items.
Selected a button dispatches an action to change data in Center Bar in Home Page
*/

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from '../styles';
import BtnMaker from './BtnMaker';
import { selectItemType, selectItem, resetOptions, selectBread } from '../store';

const LeftSideBar = () => {
  const itemTypes = useSelector(store => store.itemTypes);
  const selectedMenuType = useSelector(store => store.selectedMenuType);
  const selectedItemType = useSelector(store => store.selectedItemType);

  const dispatch = useDispatch();

  // only display menuItems for selected Menu Type
  let displayItemTypes = []
  itemTypes.forEach((itemType) => {
    if(itemType.menu_type === selectedMenuType) displayItemTypes.push(itemType)
  })

  // when an Item Type button is pressed, select it so relevant items are shown
  // in Center Bar
  const callback = (itemTypeId) => {
    dispatch(selectItemType(itemTypeId))
    dispatch(selectItem(-1))   // reset selected Item, bread, options
    dispatch(selectBread(-1))
    dispatch(resetOptions())
  }

  return (
    <div style={styles.sideBar}>
      {
        displayItemTypes.map((itemType, index) =>
          <BtnMaker
            key={index}
            index={index}
            obj={itemType}
            callback={() => callback(itemType.pk)}
            type="general"
            selected={itemType.pk === selectedItemType}
            />
          )}
    </div>
  )
}

export default LeftSideBar
