// creating store, exporting what's required

import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import reducers from './reducers';

// setting up redux persist
const persistConfig = {
  key: 'authType',
  storage: storage,
}
const persistedReducers = persistReducer(persistConfig, reducers)

const store = createStore(persistedReducers, applyMiddleware(thunk));

export const persistor = persistStore(store)
export default store

export { loadInitialData } from './middleware';
export {
    selectMenuType, selectItemType, selectItem, addOption,
    removeOption, selectBread, resetOptions, addCartEntry, resetCart,
    removeLastItem, setTotal, displayPayButtons, hidePayButtons, displayChange,
    hideChange, displayCardButtons, hideCardButtons, setMessage, setChange, setLeftToPay
  } from './actions';
