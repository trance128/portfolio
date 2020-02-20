/* Redux store
The same store is used in Web and Mobile versions
*/

import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

export default createStore(reducers, applyMiddleware(thunk));

export { setTimeRemaining, toggleWork, pause, reset, showOptions, hideOptions, updateSettings } from './actions';
export { completeStart, completeUnpause } from './middleware';
