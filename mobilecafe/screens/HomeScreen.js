/* Loads initial data and starts the select option chain */

import React, { useState } from 'react';
import { Text, View, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import styles from '../styles';
import {loadInitialData } from '../redux';
import SelectMenuType from './SelectMenuType';

export default function HomeScreen({ navigation }) {
  // getting redux store data
  const dataLoaded = useSelector(store => store.dataLoaded);
  const dispatch = useDispatch();

  if(!dataLoaded){
    dispatch(loadInitialData());
  }

  return (
    <SelectMenuType navigation={navigation} />
  );
}

HomeScreen.navigationOptions = {
  header: null,
}
