// Redux reducers

import {
  DATA_FAILED,
  DATA_LOADED,
  UPLOAD_DATA_START,
  UPLOAD_FAILED,
  UPLOAD_SUCCESS,

  SELECT_MENU_TYPE,
  SELECT_ITEM_TYPE,
  SELECT_ITEM,
  ADD_OPTION,
  REMOVE_OPTION,
  SELECT_BREAD,
  RESET_OPTIONS,
  ADD_CART_ENTRY,
  RESET_CART,
  REMOVE_LAST_ITEM,
  SET_TOTAL,
  SET_IS_CART_VALID,
  SET_CART_LENGTH,

  MENU_ITEMS_DATA_FULFILLED,
  ITEM_TYPES_DATA_FULFILLED,
  MENU_TYPES_DATA_FULFILLED,
  OPTIONS_DATA_FULFILLED,
  ADDONS_DATA_FULFILLED,
  BREADTYPES_DATA_FULFILLED,
 } from './actions';
 import initialData from './initialData';

export default function(storeData = initialData, action) {
  switch(action.type){
    case Error:
      return {
        ...storeData,
        Error: action.payload
      }
    case DATA_FAILED:
      return {
        ...storeData,
        dataLoaded: false,
      }
    case DATA_LOADED:
      return {
        ...storeData,
        dataLoaded: true,
      }
    case UPLOAD_DATA_START:
      return {
        ...storeData,
        processingData: true,
      }
    case UPLOAD_FAILED:
      return {
        ...storeData,
        uploadSuccess: false,
        uploadFailed: true,
        processingData: false,
      }
    case UPLOAD_SUCCESS:
      return {
        ...storeData,
        uploadSuccess: true,
        processingData: false,
      }
    case MENU_ITEMS_DATA_FULFILLED:
      return {
        ...storeData,
        menuItems: action.payload,
      }
    case ITEM_TYPES_DATA_FULFILLED:
      return {
        ...storeData,
        itemTypes: action.payload,
      }
    case MENU_TYPES_DATA_FULFILLED:
      return {
        ...storeData,
        menuTypes: action.payload,
      }
    case OPTIONS_DATA_FULFILLED:
      return {
        ...storeData,
        options: action.payload,
      }
    case ADDONS_DATA_FULFILLED:
      return {
        ...storeData,
        addons: action.payload
      }
    case BREADTYPES_DATA_FULFILLED:
      return {
        ...storeData,
        breadTypes: action.payload,
      }
    case SELECT_MENU_TYPE:
      return {
        ...storeData,
        selectedMenuType: action.payload
      }
    case SELECT_ITEM_TYPE:
      return {
        ...storeData,
        selectedItemType: action.payload
      }
    case SELECT_ITEM:
      return {
        ...storeData,
        selectedItem: action.payload
      }
    case ADD_OPTION:
      return {
        ...storeData,
        selectedOptions: storeData["selectedOptions"].concat(action.payload),
      }
    case REMOVE_OPTION:
      return {
        ...storeData,
        selectedOptions: storeData["selectedOptions"].filter(option => option !== action.payload),
      }
    case RESET_OPTIONS:
      return {
        ...storeData,
        selectedOptions: [],
      }
    case SELECT_BREAD:
      return {
        ...storeData,
        selectedBread: action.payload,
      }
    case ADD_CART_ENTRY:
      return {
        ...storeData,
        cart: storeData.cart.concat(action.payload)
      }
    case RESET_CART:
      return {
        ...storeData,
        cart: [],
      }
    case REMOVE_LAST_ITEM:
      return {
        ...storeData,
        cart: storeData.cart.splice(0, storeData.cart.length - 1) // returns all but last item
      }
    case SET_TOTAL:
      return {
        ...storeData,
        total: action.payload,
      }
    case SET_IS_CART_VALID:
      return {
        ...storeData,
        isCartValid: action.payload,
      }
    case SET_CART_LENGTH:
      return {
        ...storeData,
        cartLength: action.payload,
      }
    default:
      return {
        ...storeData,
      }
  }
}
