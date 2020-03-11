// Redux reducers

import {
  DATA_FAILED,
  DATA_LOADED,
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
  MENU_ITEMS_DATA_FULFILLED,
  ITEM_TYPES_DATA_FULFILLED,
  MENU_TYPES_DATA_FULFILLED,
  OPTIONS_DATA_FULFILLED,
  ADDONS_DATA_FULFILLED,
  BREADTYPES_DATA_FULFILLED,
  HIDE_PAY_BUTTONS,
  DISPLAY_PAY_BUTTONS,
  DISPLAY_CHANGE,
  HIDE_CHANGE,
  DISPLAY_CARD_BUTTONS,
  HIDE_CARD_BUTTONS,
  SET_MESSAGE,
  SET_CHANGE,
  SET_LEFT_TO_PAY,
 } from './actions';
 import initialData from './initialData';

export default function(storeData = initialData, action) {
  switch(action.type){
    case Error:
      return {
        ...storeData,
        Error: action.payload
      }
    case HIDE_PAY_BUTTONS:
      return {
        ...storeData,
        displayPayButtons: false,
      }
    case DISPLAY_PAY_BUTTONS:
      return {
        ...storeData,
        displayPayButtons: true,
      }
    case DISPLAY_CHANGE:
      return {
        ...storeData,
        displayChange: true,
      }
    case HIDE_CHANGE:
      return {
        ...storeData,
        displayChange: false,
      }
    case DISPLAY_CARD_BUTTONS:
      return {
        ...storeData,
        displayCardButtons: true,
      }
    case HIDE_CARD_BUTTONS:
      return {
        ...storeData,
        displayCardButtons: false,
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
    case SET_MESSAGE:
      return {
        ...storeData,
        message: action.payload,
      }
    case SET_CHANGE:
      return {
        ...storeData,
        change: action.payload,
      }
    case SET_LEFT_TO_PAY:
      return {
        ...storeData,
        leftToPay: action.payload,
      }
    default:
      return {
        ...storeData,
      }
  }
}
