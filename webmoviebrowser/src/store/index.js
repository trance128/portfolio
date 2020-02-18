/* Redux store.  Import reducers, applying middleware
Store is exported as default, action creators also exported */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

export const store = createStore(reducers, applyMiddleware(thunk));

export { setTitle, apiSearchTitle, apiSearchDetails } from './actions';
