import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Alert from '../Components/Alert';
import Article from '../Components/Article';
import Loader from '../Components/Loader';
import { getSingleArticle } from '../redux/action/ArticleAction';

const SingleArticleContainer = () => {
  const { articleId } = useParams();

  const dispatch = useDispatch();
  const fetchSingleArticle = useSelector((state) => state.fetchSingleArticle);
  const { loading, article, error } = fetchSingleArticle;

  useEffect(() => {
    dispatch(getSingleArticle(articleId));
  }, [dispatch, articleId]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert fail msg={error} />
      ) : (
        Object.keys(article).length > 0 && (
          <Article
            key={articleId}
            article={article}
            details={true}
            fromSingleContainer={true}
          />
        )
      )}
    </>
  );
};

export default SingleArticleContainer;
