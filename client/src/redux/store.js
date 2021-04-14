import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import jwtDecode from 'jwt-decode';

import {
  devSigninReducer,
  devSignupReducer,
  devProfileReducer,
  devProfileDelReducer,
  devProfileEditReducer,
  devProfileDpEditReducer,
  devProfileCoverEditReducer,
  devPublicViewReducer,
} from './reducer/DeveloperReducer';
import {
  createArticelReducer,
  fetchAllArticelReducer,
  fetchSingleArticelReducer,
  fetchUserArticlesReducer,
  delSingleArticelReducer,
  editArticelReducer,
  articleCommentsReducer,
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
  fetchUserArticles: fetchUserArticlesReducer,
  deleteSingleArticle: delSingleArticelReducer,
  editArticle: editArticelReducer,
  devPublicView: devPublicViewReducer,
  articleComments: articleCommentsReducer,
});

const verifyToken = (token, lsItem) => {
  const currentDate = new Date();
  const decodeToken = jwtDecode(token);
  if (currentDate.getTime() > decodeToken.exp * 1000) {
    localStorage.removeItem(lsItem);
    return false;
  } else return true;
};

const initialState = {
  signInDev: {
    isAuthenticated: localStorage.getItem('devInfo')
      ? verifyToken(
          JSON.parse(localStorage.getItem('devInfo')).token,
          'devInfo'
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
