import React from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import ArticleContainer from '../../Container/ArticleContainer';
import SingleArticleContainer from '../../Container/SingleArticleContainer';
import CreateArticleScreen from './CreateArticleScreen';

const ArticleScreen = () => {
  const { path, url } = useRouteMatch();
  return (
    <div>
      <div className='create_article_form mt-1 bg-white flex items-center cursor-pointer hover:text-gray-800 rounded p-3 px-6 text-gray-500 font-semibold shadow mb-2'>
        <Link to={`${url}/write`}>
          <i className='fas text-blue-500 fa-edit mr-2'></i>Write an Article
        </Link>
      </div>
      <Switch>
        <Route exact path={path} component={() => <ArticleContainer />} />
        <Route path={`${path}/write`} component={CreateArticleScreen} />
        <Route path={`${path}/:articleId`} component={SingleArticleContainer} />
      </Switch>
    </div>
  );
};

export default ArticleScreen;
