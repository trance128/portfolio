// creating store, exporting what's required

import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';

import reducers from './reducers';

// setting up redux persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}
const persistedReducers = persistReducer(persistConfig, reducers)

const store = createStore(persistedReducers, applyMiddleware(thunk));

export const persistor = persistStore(store)
export default store

export { loadInitialData, addCartEntryMiddleware, uploadCart, updateCartMetaData } from './middleware';
export {
    selectMenuType, selectItemType, selectItem, addOption,
    removeOption, selectBread, resetOptions, addCartEntry, resetCart,
    removeLastItem, setTotal, setCartValid, setCartLength,
  } from './actions';
