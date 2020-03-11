/*
Actions, realted constants an action creators (not including middleware)
*/

// Actions, separated by category for easy reading
export const DATA_FAILED = "DATA_FAILED"
export const DATA_LOADED = "DATA_LOADED"

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

// pay page actions
export const HIDE_PAY_BUTTONS = "HIDE_PAY_BUTTONS"
export const DISPLAY_PAY_BUTTONS = "DISPLAY_PAY_BUTTONS"
export const DISPLAY_CHANGE = "DISPLAY_CHANGE"
export const HIDE_CHANGE = "HIDE_CHANGE"
export const DISPLAY_CARD_BUTTONS = "DISPLAY_CARD_BUTTONS"
export const HIDE_CARD_BUTTONS = "HIDE_CARD_BUTTONS"
export const SET_MESSAGE = "SET_MESSAGE"
export const SET_CHANGE = "SET_CHANGE"
export const SET_LEFT_TO_PAY = "SET_LEFT_TO_PAY"

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

export const selectBread = (breadId) => {
  return {
    type: SELECT_BREAD,
    payload: breadId,
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

export const hidePayButtons = () => {
  return {
    type: HIDE_PAY_BUTTONS,
  }
}

export const displayPayButtons = () => {
  return {
    type: DISPLAY_PAY_BUTTONS,
  }
}

export const displayChange = () => {
  return {
    type: DISPLAY_CHANGE,
  }
}

export const hideChange = () => {
  return {
    type: HIDE_CHANGE,
  }
}

export const displayCardButtons = () => {
  return {
    type: DISPLAY_CARD_BUTTONS,
  }
}

export const hideCardButtons = () => {
  return {
    type: HIDE_CARD_BUTTONS,
  }
}

export const setMessage = (message) => {
  return {
    type: SET_MESSAGE,
    payload: message
  }
}

export const setChange = (number) => {
  return {
    type: SET_CHANGE,
    payload: number,
  }
}

export const setLeftToPay = (number) => {
  return {
    type: SET_LEFT_TO_PAY,
    payload: number,
  }
}
