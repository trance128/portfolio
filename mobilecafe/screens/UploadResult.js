import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { View, Text, ImageBackground } from 'react-native';
import { StackActions } from '@react-navigation/native';

import styles from '../styles';
import backgroundImage from '../assets/images/coffee4.jpg';
import BtnMaker from '../components/BtnMaker';
import { uploadCart } from '../redux';

const UploadResult = ({navigation}) => {
  const processingData = useSelector(store => store.processingData);
  const uploadSuccess = useSelector(store => store.uploadSuccess);

  const dispatch = useDispatch();

  const addMoreItems = () => {
    navigation.dispatch(StackActions.popToTop());
  }

  const retryOrder = () => {
    dispatch(uploadCart());
  }

  if(processingData){
    return(
      <ImageBackground style={styles.containerOne} source={backgroundImage}>
        <View style={styles.containerLayerTwo}>
          <Text style={styles.titleText}>Processing...</Text>
          <Text style={styles.mainText}>This may take a minute.</Text>
          <Text style={styles.mainText}>Please don't close app until done</Text>
        </View>
      </ImageBackground>
    )
  } else {
    if(uploadSuccess) {
      return (
        <ImageBackground style={styles.containerOne} source={backgroundImage}>
          <View style={styles.containerLayerTwo}>
            <View style={styles.containerTopUploadResultPage}>
              <Text style={styles.titleText}>Order Received</Text>
              <Text style={styles.mainText}>Please pay at the counter</Text>
            </View>

            <View style={styles.containerBottomSingleButton}>
              <BtnMaker index={1} obj={{name: "New Order"}} callback={() => addMoreItems()} selected={false} style={styles.buttonBlue} />
            </View>
          </View>
        </ImageBackground>
      )
    }

    else {
      return (
        <ImageBackground style={styles.containerOne} source={backgroundImage}>
          <View style={styles.containerLayerTwo}>
            <View style={styles.containerTopUploadResultPage}>
              <Text style={styles.titleText}>Something has gone wrong</Text>
              <Text style={styles.mainText}>Please try again.</Text>
              <Text style={styles.mainText}>If these problems persist, contact a member of staff</Text>
            </View>

            <View style={styles.containerBottom}>
              <BtnMaker index={1} obj={{name: "Try Again"}} callback={() => retryOrder()} selected={false} style={styles.buttonBlue} />
              <BtnMaker index={1} obj={{name: "New Order"}} callback={() => addMoreItems()} selected={false} style={styles.buttonRed} />
            </View>
          </View>
        </ImageBackground>
      )
    }
  }
}

export default UploadResult
