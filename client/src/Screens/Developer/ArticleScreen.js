import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ArticleContainer from '../../Container/ArticleContainer';
import SingleArticleContainer from '../../Container/SingleArticleContainer';
import CreateArticleScreen from './CreateArticleScreen';

const ArticleScreen = () => {
  const { path } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route exact path={path} component={() => <ArticleContainer />} />
        <Route path={`${path}/write`} component={CreateArticleScreen} />
        <Route path={`${path}/:articleId`} component={SingleArticleContainer} />
      </Switch>
    </div>
  );
};

export default ArticleScreen;
