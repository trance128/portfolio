import React  from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import store, {persistor} from './store'
import Home from './components/Home';
import Pay from './components/Pay';
import Edit from './components/Edit';

export default function App() {
  return(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Route path="/" exact={true} component={Home} />
          <Route path="/pay" component={Pay} />
          <Route path="/edit" component={Edit} />
        </Router>
      </PersistGate>
    </Provider>
  )
}
