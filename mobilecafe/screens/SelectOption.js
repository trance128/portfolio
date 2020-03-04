import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { View, FlatList, Text, ImageBackground } from 'react-native';

import styles from '../styles';
import BtnMaker from '../components/BtnMaker';
import { selectMenuType, selectItemType, selectItem, resetOptions, addOption,
  removeOption, selectBread, addCartEntryMiddleware, resetCart } from '../redux';
import backgroundImage from '../assets/images/coffee1.jpg';

const SelectOption = ({route, navigation}) => {
  const menuTypes = useSelector(store => store.menuTypes);
  const selectedMenuType = useSelector(store => store.selectedMenuType);
  const itemTypes = useSelector(store => store.itemTypes);
  const selectedItemType = useSelector(store => store.selectedItemType);
  const menuItems = useSelector(store => store.menuItems);
  const selectedItem = useSelector(store => store.selectedItem);
  const options = useSelector(store => store.options);
  const selectedOptions = useSelector(store => store.selectedOptions);
  const breadTypes = useSelector(store => store.breadTypes);
  const selectedBread = useSelector(store => store.selectedBread);

  const dispatch = useDispatch();

  const { iteration } = route.params;

  const processSelection = (item, iteration) => {
    switch (iteration) {
      case 0:
        batch(() => {
          dispatch(selectMenuType(item));
          dispatch(selectItemType(-1));
        })
        navigation.push("SelectOption", {iteration: 1});
        break;
      case 1:
        batch(() => {
          dispatch(selectItemType(item));
          dispatch(selectItem(-1));
        })
        navigation.push("SelectOption", {iteration: 2});
        break;
      case 2:
        batch(() => {
          dispatch(selectItem(item));
          // reset bread and options when choosing new item
          dispatch(resetOptions());
          dispatch(selectBread(-1));
        })
        if(item.options.length > 0) {
          navigation.push("SelectOption", {iteration: 3});
        }
        else {
          if(item.bread_type.length > 0) {
            navigation.push("SelectOption", {iteration: 4});
          } else {
            processAddToCart();
            navigation.navigate("Summary");
          }
        }
        break;
      case 3:
        selectedOptions.includes(item) ? dispatch(removeOption(item)) : dispatch(addOption(item))
        break;
      case 4:
        dispatch(selectBread(item));
        processAddToCart();
        break;
    }
  }

  // options are added to store on button press, therefore this func just navigates to
  // next page
  const processAddOptions = () => {
    selectedItem.bread_type.length > 0 ? navigation.push("SelectOption", {iteration: 4}) : processAddToCart();
  }

  // adds selected Item, Options, Bread to cart, updates price
  const processAddToCart = () => {
    dispatch(addCartEntryMiddleware());
    // navigates to summary page
    navigation.navigate("Summary");
  }

  // choosing relevant data to display
  let data = [];
  switch (iteration) {
    case 0:
      data = menuTypes
      break;
    case 1:
      itemTypes.forEach(itemType => {
        if(itemType.menu_type === selectedMenuType.pk) data.push(itemType)
      })
      break;
    case 2:
      menuItems.forEach(item => {
        if(item.type === selectedItemType.pk) data.push(item)
      })
      break;
    case 3:
      options.forEach(option => {
        if(selectedItem.options) if(selectedItem.options.includes(option.pk)) data.push(option)
      })
      break;
    case 4:
      breadTypes.forEach(bread => {
        if(selectedItem.bread_type) if(selectedItem.bread_type.includes(bread.pk)) data.push(bread)
      })
      break;
  }

  // choosing correct title
  let title = "";
  switch (iteration) {
    case 0:
      title = "Select Category"
      break;
    case 1:
      title= "Select Item Type"
      break;
    case 2:
      title="Select Main Item"
      break;
    case 3:
      title="Select Options"
      break;
    case 4:
      title="Select Type of Bread"
      break;
  }

  return (
    <ImageBackground style={styles.containerOne} source={backgroundImage}>
      <View style={styles.containerLayerTwoTopNav}>
        <Text style={styles.titleText}>{ title }</Text>
      </View>
      <View style={styles.containerLayerTwo}>
        <FlatList
          data={data}
          renderItem={({item}) => <BtnMaker index={item.pk} obj={item} callback={() => props.processSelection(item, iteration)} selected={iteration !== 3 ? false : selectedOptions.includes(item) } />}
          keyExtractor={item => `list-item-${item.pk}`} />
        { iteration === 3 &&
        <BtnMaker index={1} obj={{name: "Add Options"}} callback={() => processAddOptions()} selected={false} style={styles.buttonBlue} /> }
      </View>
    </ImageBackground>
  )
}

export default SelectOption
