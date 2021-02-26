import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../../Components/Alert';
import Article from '../../Components/Article';
import Loader from '../../Components/Loader';
import { getUserArticles } from '../../redux/action/ArticleAction';

const DevArticleScreen = ({ user }) => {
  const dispatch = useDispatch();
  const fetchUserArticles = useSelector((state) => state.fetchUserArticles);
  const { loading, error, articles } = fetchUserArticles;
  useEffect(() => {
    dispatch(getUserArticles(user?._id));
    return () => {};
  }, [dispatch, user?._id]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert fail msg={error} />
      ) : articles?.length > 0 ? (
        articles.map((article) => (
          <Article
            article={article}
            key={article?._id}
            routeFromProfile
            fromProfile={true}
            userId={user?._id}
          />
        ))
      ) : (
        'No articles posted yet!'
      )}
    </div>
  );
};

export default DevArticleScreen;
