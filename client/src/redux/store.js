import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { devSigninReducer, devSignupReducer } from './reducer/DeveloperReducer';

const reducer = combineReducers({
  signUpDev: devSignupReducer,
  signInDev: devSigninReducer,
});

const initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
