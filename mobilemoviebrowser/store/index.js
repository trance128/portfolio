/* Redux store.  Import reducers, applying middleware
Store is exported as default, action creators also exported

The entire redux store is unchanged from the web implementation
*/

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

export const store = createStore(reducers, applyMiddleware(thunk));

export { setTitle, apiSearchTitle, apiSearchDetails, setId } from './actions';
