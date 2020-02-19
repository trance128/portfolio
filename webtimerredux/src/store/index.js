// creating the store and exporting

import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

export default createStore(reducers, applyMiddleware(thunk));
