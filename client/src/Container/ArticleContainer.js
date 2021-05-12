import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '../Components/Alert';
import Article from '../Components/Article';
import Loader from '../Components/Loader';
import TopArticle from '../Components/TopArticle';
import { getAllArticles } from '../redux/action/ArticleAction';
import ReactTagInput from '@pathofdev/react-tag-input';

const ArticleContainer = ({ topArticle }) => {
  const dispatch = useDispatch();

  const [tags, setTags] = useState([]);

  const fetchAllArticle = useSelector((state) => state.fetchAllArticle);
  const { loading, articles, error } = fetchAllArticle;

  useEffect(() => {
    dispatch(getAllArticles());
    return () => {};
  }, [dispatch]);

  const filterdArticles = articles?.filter((article) => {
    if (tags?.length < 1) {
      return articles;
    } else {
      const contain = article?.tags?.map((tag) => {
        const queryTag = tags.map((t) =>
          t.toLowerCase() === tag.toLowerCase() ? true : false
        );
        if (queryTag.includes(true)) {
          return true;
        } else {
          return false;
        }
      });
      if (contain.includes(true)) {
        return article;
      } else {
        return null;
      }
    }
  });

  return (
    <>
      <div className='rounded bg-white mt-2 p-2 shadow'>
        <span className='text-sm text-gray-500 font-semibold'>
          <i className='fas fa-filter text-gray-500 mr-1'></i>
          Filter Article
        </span>
        <div>
          <ReactTagInput
            placeholder='Add a Tag'
            maxTags='10'
            editable='true'
            tags={tags}
            removeOnBackspace={true}
            onChange={(newTag) => setTags(newTag)}
          />
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert fail msg={error} />
      ) : filterdArticles?.length > 0 && topArticle === true ? (
        filterdArticles
          ?.sort((a, b) => (a.upvote.length < b.upvote.length ? 1 : -1))
          .map((art) => <TopArticle key={art._id} article={art} />)
      ) : (
        topArticle === false &&
        filterdArticles?.map((art) => <Article key={art._id} article={art} />)
      )}
    </>
  );
};

export default ArticleContainer;
