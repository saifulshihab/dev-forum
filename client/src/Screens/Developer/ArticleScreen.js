import React from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import ArticleContainer from '../../Container/ArticleContainer';
import SingleArticleContainer from '../../Container/SingleArticleContainer';
import CreateArticleScreen from './CreateArticleScreen';
import UpdateArticleScreen from './UpdateArticleScreen';

const ArticleScreen = () => {
  const { path, url } = useRouteMatch();
  return (
    <div>
      <div className='h-12 items-center bg-white flex rounded shadow p-2 mt-2'>
        <div className='mx-auto h-full flex-shrink-0 flex items-center justify-center w-12 rounded-full bg-indigo-100 text-indigo-400 sm:mx-0 sm:h-10 sm:w-10'>
          <i className='far text-blue-500 fa-newspaper'></i>
        </div>
        <Link className='w-full' to={`${url}/write`}>
          <div className='flex items-center text-sm text-gray-400 rounded cursor-pointer ml-2 bg-gray-100 p-2 h-full'>
            Write an Article...
          </div>
        </Link>
      </div>
      <Switch>
        <Route
          exact
          path={path}
          component={() => <ArticleContainer topArticle={false} />}
        />
        <Route path={`${path}/write`} component={CreateArticleScreen} />
        <Route
          exact
          path={`${path}/:articleId`}
          component={SingleArticleContainer}
        />
        <Route
          path={`${path}/:articleId/edit`}
          component={UpdateArticleScreen}
        />
      </Switch>
    </div>
  );
};

export default ArticleScreen;
