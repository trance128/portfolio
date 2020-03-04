/*
Displays the options to select given an array of data, title and function
Also displays extra button if we're on the options page, denotes by optionPage={true}
*/

import React from 'react'
import { useSelector } from 'react-redux';
import { View, FlatList, Text, ImageBackground } from 'react-native';

import styles from '../styles';
import BtnMaker from './BtnMaker'
import backgroundImage from '../assets/images/coffee1.jpg';

const DisplaySelectOptions = (props) => {
  const resetAdd = () => {
    props.navigation.navigate("Home");
  }

  if(props.optionPage){
    return (
      <ImageBackground style={styles.containerOne} source={backgroundImage}>
        <View style={styles.containerLayerTwoTopNav}>
          <Text style={styles.titleText}>{ props.title }</Text>
        </View>
        <View style={styles.containerLayerTwo}>
          <FlatList
            data={props.data}
            renderItem={({item}) => <BtnMaker index={item.pk} obj={item} callback={() => props.processSelection(item)} selected={props.selectedOptions.includes(item)} />}
            keyExtractor={item => `list-item-${item.pk}`} />
          <BtnMaker index={1} obj={{name: "Add Options"}} callback={() => props.processAddOptions()} selected={false} style={styles.buttonBlue} />
          <BtnMaker index={1} obj={{name: "Reset"}} callback={() => resetAdd()} selected={false} style={styles.buttonSand} />
        </View>
      </ImageBackground>
    )
  } else {
    return(
      <ImageBackground style={styles.containerOne} source={backgroundImage}>
        <View style={styles.containerLayerTwoTopNav}>
          <Text style={styles.titleText}>{ props.title }</Text>
        </View>
        <View style={styles.containerLayerTwo}>
          <FlatList
            data={props.data}
            renderItem={({item}) => <BtnMaker index={item.pk} obj={item} callback={() => props.processSelection(item)} selected={false} />}
            keyExtractor={item => `list-item-${item.pk}`} />
          { !props.homePage &&
            <BtnMaker index={1} obj={{name: "Reset"}} callback={() => resetAdd()} selected={false} style={styles.buttonSand} />
          }
        </View>
      </ImageBackground>
    )
  }
}

export default DisplaySelectOptions
