import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers'; // it will take the './reducers/index.js'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
  // add support for Redux dev tools
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant())));
}

// Redux middleware is a way to enhance Redux's behavior (optional)

// reduxImmutableStateInvariant() will warn us if we accidentally mutate Redux state
