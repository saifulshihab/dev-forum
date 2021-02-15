import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '../Components/Alert';
import Article from '../Components/Article';
import Loader from '../Components/Loader';
import TopArticle from '../Components/TopArticle';
import { getAllArticles } from '../redux/action/ArticleAction';

const ArticleContainer = ({ topArticle }) => {
  const dispatch = useDispatch();
  const fetchAllArticle = useSelector((state) => state.fetchAllArticle);
  const { loading, articles, error } = fetchAllArticle;

  useEffect(() => {
    dispatch(getAllArticles());
    return () => {};
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert fail msg={error} />
      ) : articles?.length > 0 && topArticle === true ? (
        articles
          ?.sort((a, b) => (a.upvote < b.upvote ? 1 : -1))
          .map((art) => <TopArticle key={art._id} article={art} />)
      ) : (
        topArticle === false &&
        articles?.map((art) => <Article key={art._id} article={art} />)
      )}
    </div>
  );
};

export default ArticleContainer;
