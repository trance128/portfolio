/*
NavBar at top of page
Contains Menu Types, Admin and Sign Out functions
*/

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from "../styles";
import BtnMaker from './BtnMaker'
import { selectMenuType, selectItemType } from '../store'

const TopNav = () => {
  // necessary store data
  const menuTypes = useSelector(store => store.menuTypes)
  const selectedMenuType = useSelector(store => store.selectedMenuType)
  const dispatch = useDispatch()

  // if button is clicked, set selected Menu Type
  const callback = (menuTypeId) => {
    dispatch(selectMenuType(menuTypeId))
    dispatch(selectItemType(-1)) // reset Item Type
  }

  // iterates through menu types and creates a button for each
  return(
    <div style={{...styles.navBarContainer, ...styles.center}}>
      { Object.keys(menuTypes).map((key, index) => <BtnMaker key={index}
          obj={menuTypes[key]}
          index={index}
          callback={() => callback(menuTypes[key].pk)}
          type="topNav"
          selected={menuTypes[key].pk === selectedMenuType}
          /> )}
    </div>
  )
}

export default TopNav
