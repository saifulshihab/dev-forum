import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../../Components/Alert';
import Article from '../../Components/Article';
import Loader from '../../Components/Loader';
import { getUserArticles } from '../../redux/action/ArticleAction';

const DevArticleScreen = ({ user, recruiterView }) => {
  const dispatch = useDispatch();
  const fetchUserArticles = useSelector((state) => state.fetchUserArticles);
  const { loading, error, articles } = fetchUserArticles;
  useEffect(() => {
    dispatch(getUserArticles(user?._id, recruiterView));
    return () => {};
  }, [dispatch, user?._id, recruiterView]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert fail msg={error} />
      ) : articles?.length > 0 ? (
        articles.map((article) => (
          <Article article={article} key={article?._id} routeFromProfile />
        ))
      ) : (
        'No articles posted yet!'
      )}
    </div>
  );
};

export default DevArticleScreen;
