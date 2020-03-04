/*
MiddleWare.
Contains any async functions.  This could also be split up in multiple files,
with async functions separate and this file just calling them and dispatching result.

This particular project was made with a Django backend in development mode,
and tested on an emulator, with NGROK used to allow the emulator to access
localhost.  However, the code here isn't dependant on the backend, save for using
the same structure when posting data
*/

import { batch } from 'react-redux';

// Expanding on Actions
import {
  MENUITEMS, ITEMTYPES, MENUTYPES, OPTIONS, ADDONS, BREADTYPES, ERROR,
  storeData, dataFailed, dataLoaded, addCartEntry,
  selectItem, selectItemType, selectBread, resetOptions, selectMenuType,
  uploadDataStart, uploadFailed, uploadSuccess, resetCart, setCartValid,
  setCartLength, setTotal
 } from './actions';

// ngrok URL used in dev to connect to Django server
const baseURL = "http://4ca725af.ngrok.io"

// loads initial data from server
export const loadInitialData = () => async dispatch => {
  // names of data we're loading
  const data_types = [MENUITEMS, ITEMTYPES, MENUTYPES, OPTIONS, ADDONS, BREADTYPES]
  let result = []
  try {
    // iterates over the data types, fetching data for each and adding to result
    for( let i = 0; i < data_types.length; i++) {
      result[i] = await fetch(`${baseURL}/api/${data_types[i]}/?format=json`)

      if (result[i].status > 400) { // in case of error, dispatch failure
        dispatch(dataFailed())      // this will lead to reload data
      }

      const data = await result[i].json()
      dispatch(storeData(data, data_types[i])) // stores data in redux, passing i so we know which
      dispatch(dataLoaded())
    }
  } catch (err) {
    dispatch({type: ERROR, payload: err}) // more error checking
  }
}

// uploads cart data to server.
// first loads data from store
// iterates over Cart, which is an array of entries
// uploads each entry individually, keeping track of their PK's
// finally, upload cart with pk's from cart entries.
export const uploadCart = () => async (dispatch, getState) => {
  dispatch(uploadDataStart());
  // get cart data from state
  try {
    let {cart, total} = getState()

    let cartEntriesPk = []

    // iterates over cart, uploading each entry
    // stores id from cart entry to later upload cart
    for(let i = 0; i < cart.length; i++){

      // cleaning data, making it as API requires
      let options = []
      if(cart[i].options.length > 0) {
        cart[i].options.forEach(option => options.push(option.pk));
      }

      let bread = [];
      if(cart[i].bread) {
        bread.push(cart[i].bread.pk)
      }

      // upload cart entry
      const entryResponse = await fetch(`${baseURL}/api/cartentries/`, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
          item: cart[i].item.pk,
          bread: bread,
          options: options,
          price: cart[i].price,
        }),
      });
      const entryResult = await entryResponse.json();

      if(entryResponse.ok) {
        cartEntriesPk.push(entryResult.pk)  // adding pk to cart entry pk array
      } else {
        dispatch(uploadFailed())
        return false;
      }
    }

    // upload cart with cart entry pk's
    const cartResponse = await fetch(`${baseURL}/api/carts/`, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        total: total,
        status: "Complete",
        entries: cartEntriesPk,
        payment_method: "MobileApp"
      }),
    });

    const cartResult = await cartResponse.json();

    // if everything is ok, fully reset cart and all selections
    if(cartResponse.ok) {
      batch(() => {
        dispatch(uploadSuccess());

        dispatch(resetCart());
        dispatch(setCartValid(false));
        dispatch(setTotal(0));
        dispatch(setCartLength(0));
      })
    } else {
      dispatch(uploadFailed());
      return false;
    }

  } catch (err) {   // catching errors
    dispatch({type: ERROR, payload: err})
    dispatch(uploadFailed());
  }
}

// adds a cart entry based on the current state
export const addCartEntryMiddleware = () => (dispatch, getState) => {
  let {selectedItem, selectedOptions, selectedBread, total } = getState();
  let bread;

  // get price, starting from item price
  let price = selectedItem.price
  // add any price change from options
  if(selectedOptions.length > 0) {
    selectedOptions.forEach(option => {
        if(option.price_change) price += option.price_change
    });
  };
  // add price change from bread choice
  if(selectedBread !== -1) {
    bread = selectedBread
    if(selectedBread.price_change) price += selectedBread.price_change
  } else {
    bread = null
  }

  // dispatch the cart addition, updates total and reset menu type
  batch(() => {
    dispatch(addCartEntry({
      item: selectedItem,
      bread: bread,
      options: selectedOptions,
      notes: "",
      price: price,
    }));
    dispatch(updateCartMetaData());
  })
}

export const updateCartMetaData = () => (dispatch, getState) => {
  const {cart} = getState();
  let length = cart.length;

  let total = 0
  cart.map(item => total += item.price);

  batch(() => {
    dispatch(setCartLength(length));
    dispatch(setTotal(total));
    (length > 0) ? dispatch(setCartValid(true)) : dispatch(setCartValid(false));
  })
}
