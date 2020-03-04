import React from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { View, Text, ImageBackground, ScrollView, FlatList } from 'react-native';
import { StackActions } from '@react-navigation/native';

import backgroundImage from '../assets/images/coffee3.jpg';
import styles from '../styles';
import BtnMaker from '../components/BtnMaker';
import DisplayCartEntry from '../components/DisplayCartEntry';
import { resetCart, uploadCart, removeLastItem, setCartValid, setTotal,
  setCartLength, updateCartMetaData } from '../redux';

const SummaryScreen = ({navigation}) => {
  const cart = useSelector(store => store.cart);
  const isCartValid = useSelector(store => store.isCartValid);
  const total = useSelector(store => store.total);

  const dispatch = useDispatch();

  // clears cart and resets cart related details
  const clearCart = () => {
    batch(() => {
      dispatch(resetCart());
      dispatch(setCartValid(false));
      dispatch(setTotal(0));
      dispatch(setCartLength(0));
    })
  }

  const removeLast = () => {
    if(isCartValid){
      dispatch(removeLastItem());
      dispatch(updateCartMetaData());
    }
  }

  const addMoreItems = () => {
    navigation.navigate("Home");
  }

  const checkout = () => {
    if(isCartValid){
      dispatch(uploadCart());
      navigation.navigate("UploadResult")
    }
  }

  return(
    <ImageBackground style={styles.containerOne} source={backgroundImage}>
      <View style={styles.containerLayerTwo}>
        <View style={styles.containerTop}>
          <Text style={styles.titleText}>Cart Details</Text>
          <FlatList
            data={cart}
            renderItem={({item}) => <DisplayCartEntry itemName={item.item.name} price={item.price} options={item.options} bread={item.bread} /> }
            keyExtractor={(item, index) => `entry-${index}`} />
          <View style={styles.hr}>
          </View>
          <View style={styles.marginBottom}>
            <Text style={styles.titleText}>Total: £{total.toFixed(2)}</Text>
          </View>
        </View>
        <View style={styles.containerBottom}>
          <View style={styles.containerRow}>
            <BtnMaker index={1} obj={{name: "Add More"}} callback={() => addMoreItems()} selected={false} style={styles.buttonBlueNarrow} />
            <BtnMaker index={1} obj={{name: "Checkout"}} callback={() => checkout()} selected={!isCartValid} style={styles.buttonPurpleNarrow} />
          </View>
          <View style={styles.containerRow}>
            <BtnMaker index={1} obj={{name: "Remove Last Item"}} callback={() => removeLast()} selected={!isCartValid} style={styles.buttonSandNarrow} />
            <BtnMaker index={1} obj={{name: "Clear Cart"}} callback={() => clearCart()} selected={!isCartValid} style={styles.buttonRedNarrow} />
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}

export default SummaryScreen
