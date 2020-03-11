/*
Home Screen.
Displays all the items, option drop downs etc.
*/

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from '../styles';
import { loadInitialData, resetCart } from '../store';
import TopNav from './TopNav';
import LeftSideBar from './LeftSideBar';
import CenterBar from './CenterBar';
import RightSideBar from './RightSideBar';

const Home = () => {
  // getting relevant store data
  const dataLoaded = useSelector(store => store.dataLoaded)

  const dispatch = useDispatch()

  // since store is persisted, this should only run first time we open app
  useEffect(() => {
    if (!dataLoaded){
      dispatch(loadInitialData())
    }
  });

  return(
    <React.Fragment>
      <TopNav />
      <div style={ styles.containerLayerOne }>
        <div style={styles.containerLayerTwo}>
          <div style={styles.containerLayerThree}>
            <LeftSideBar />
            <CenterBar />
            <RightSideBar />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Home
