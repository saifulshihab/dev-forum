import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import jwt from 'jsonwebtoken';
import {
  devSigninReducer,
  devSignupReducer,
  devProfileReducer,
  devProfileDelReducer,
  devProfileEditReducer,
  devProfileDpEditReducer,
  devProfileCoverEditReducer,
} from './reducer/DeveloperReducer';
import {
  createArticelReducer,
  fetchAllArticelReducer,
  fetchSingleArticelReducer,
} from './reducer/ArticleReducer';

const reducer = combineReducers({
  signUpDev: devSignupReducer,
  signInDev: devSigninReducer,
  devProfile: devProfileReducer,
  devProfileDelete: devProfileDelReducer,
  devProfileEdit: devProfileEditReducer,
  devDpEdit: devProfileDpEditReducer,
  devCoverEdit: devProfileCoverEditReducer,
  createArticle: createArticelReducer,
  fetchAllArticle: fetchAllArticelReducer,
  fetchSingleArticle: fetchSingleArticelReducer,
});

const initialState = {
  signInDev: {
    isAuthenticated: localStorage.getItem('devInfo')
      ? jwt.verify(
          JSON.parse(localStorage.getItem('devInfo')).token,
          `dev12@#4545fo655dfo55drum`, // will be hidden in prod mode
          (err, dec) => {
            if (err) {
              localStorage.removeItem('devInfo');
              return false;
            } else {
              return true;
            }
          }
        )
      : false,
    devInfo: localStorage.getItem('devInfo')
      ? JSON.parse(localStorage.getItem('devInfo'))
      : {},
  },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
