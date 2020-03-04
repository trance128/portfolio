/*
Actions, realted constants an action creators (not including middleware)
*/

// Actions, separated by category for easy reading
export const DATA_FAILED = "DATA_FAILED"
export const DATA_LOADED = "DATA_LOADED"
export const UPLOAD_DATA_START = "UPLOAD_DATA_START"
export const UPLOAD_FAILED = "UPLOAD_FAILED"
export const UPLOAD_SUCCESS = "UPLOAD_SUCCESS"

export const MENU_ITEMS_DATA_FULFILLED = "MENU_ITEMS_DATA_FULFILLED"
export const ITEM_TYPES_DATA_FULFILLED = "ITEM_TYPES_DATA_FULFILLED"
export const MENU_TYPES_DATA_FULFILLED = "MENU_TYPES_DATA_FULFILLED"
export const OPTIONS_DATA_FULFILLED = "OPTIONS_DATA_FULFILLED"
export const ADDONS_DATA_FULFILLED = "ADDONS_DATA_FULFILLED"
export const BREADTYPES_DATA_FULFILLED = "BREADTYPES_DATA_FULFILLED"

export const ERROR = "ERROR"

export const SELECT_MENU_TYPE = "SELECT_MENU_TYPE"
export const SELECT_ITEM_TYPE = "SELECT_ITEM_TYPE"
export const SELECT_ITEM = "SELECT_ITEM"
export const ADD_OPTION = "ADD_OPTION"
export const REMOVE_OPTION = "REMOVE_OPTION"
export const RESET_OPTIONS = "RESET_OPTIONS"
export const SELECT_BREAD = "SELECT_BREAD"

export const ADD_CART_ENTRY = "ADD_CART_ENTRY"
export const RESET_CART = "RESET_CART"
export const REMOVE_LAST_ITEM = "REMOVE_LAST_ITEM"
export const SET_TOTAL = "SET_TOTAL"
export const SET_IS_CART_VALID = "SET_IS_CART_VALID"
export const SET_CART_LENGTH = "SET_CART_LENGTH"

// constants, not actions
export const MENUITEMS = "menuitems"
export const ITEMTYPES = "itemtypes"
export const MENUTYPES = "menutypes"
export const OPTIONS = "options"
export const ADDONS = "addons"
export const BREADTYPES = "breadtypes"


// action creators
export const storeData = (data, dataType) => {
  switch(dataType) {
    case MENUITEMS:
      return {
        type: MENU_ITEMS_DATA_FULFILLED,
        payload: data,
      }
    case ITEMTYPES:
      return {
        type: ITEM_TYPES_DATA_FULFILLED,
        payload: data,
      }
    case MENUTYPES:
      return {
        type: MENU_TYPES_DATA_FULFILLED,
        payload: data,
      }
    case OPTIONS:
      return {
        type: OPTIONS_DATA_FULFILLED,
        payload: data,
      }
    case ADDONS:
      return {
        type: ADDONS_DATA_FULFILLED,
        payload: data,
      }
    case BREADTYPES:
      return {
        type: BREADTYPES_DATA_FULFILLED,
        payload: data,
      }
    default:
      return {}
  }
}

export const dataFailed = () => {
  return {
    type: DATA_FAILED,
  }
}

export const dataLoaded = () => {
  return {
    type: DATA_LOADED,
  }
}

export const selectMenuType = (menuTypeId) => {
  return {
    type: SELECT_MENU_TYPE,
    payload: menuTypeId,
  }
}

export const selectItemType = (itemTypeId) => {
  return {
    type: SELECT_ITEM_TYPE,
    payload: itemTypeId,
  }
}

export const selectItem = (itemId) => {
  return {
    type: SELECT_ITEM,
    payload: itemId,
  }
}

export const addOption = (optionId) => {
  return {
    type: ADD_OPTION,
    payload: optionId,
  }
}

export const removeOption = (optionId) => {
  return {
    type: REMOVE_OPTION,
    payload: optionId,
  }
}

export const resetOptions = () => {
  return {
    type: RESET_OPTIONS,
  }
}

export const selectBread = (bread) => {
  return {
    type: SELECT_BREAD,
    payload: bread,
  }
}

export const addCartEntry = (cartEntry) => {
  return{
    type: ADD_CART_ENTRY,
    payload: cartEntry,
  }
}

export const resetCart = () => {
  return{
    type: RESET_CART,
  }
}

export const removeLastItem = () => {
  return{
    type: REMOVE_LAST_ITEM,
  }
}

export const setTotal = (total) => {
  return{
    type: SET_TOTAL,
    payload: total
  }
}

export const uploadFailed = () => {
  return {
    type: UPLOAD_FAILED,
  }
}

export const uploadSuccess = () => {
  return {
    type: UPLOAD_SUCCESS,
  }
}

export const uploadDataStart = () => {
  return{
    type: UPLOAD_DATA_START,
  }
}

export const setCartValid = (bool) => {
  return {
    type: SET_IS_CART_VALID,
    payload: bool,
  }
}

export const setCartLength = (length) => {
  return {
    type: setCartLength,
    payload: length,
  }
}
