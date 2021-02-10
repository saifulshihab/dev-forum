import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import Alert from '../Components/Alert';
import Article from '../Components/Article';
import Loader from '../Components/Loader';
import { getAllArticles } from '../redux/action/ArticleAction';

const ArticleContainer = ({ topArticle }) => {
  const { url } = useRouteMatch();

  const dispatch = useDispatch();
  const fetchAllArticle = useSelector((state) => state.fetchAllArticle);
  const { loading, articles, error } = fetchAllArticle;

  useEffect(() => {
    dispatch(getAllArticles());
    return () => {};
  }, [dispatch]);

  return (
    <div>
      <div className='create_article_form border bg-white flex items-center cursor-pointer hover:text-gray-800 rounded p-3 px-6 text-gray-500 font-semibold shadow mb-2'>
        <Link to={`${url}/write`}>
          <i className='fas text-blue-500 fa-edit mr-2'></i>Write an Article
        </Link>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert fail msg={error} />
      ) : articles?.length > 0 && topArticle === true ? (
        articles
          // .sort((a, b) => (parseInt(a.upvote) < parseInt(b.upvote) ? 1 : -1))
          .map((art) => <Article key={art._id} article={art} />)
      ) : (
        !topArticle &&
        articles.map((art) => <Article key={art._id} article={art} />)
      )}
    </div>
  );
};

export default ArticleContainer;
