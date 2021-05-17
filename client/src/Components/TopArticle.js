import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const TopArticle = ({ article }) => {
  const { url } = useRouteMatch();
  return (
    <div className='mb-2 shadow px-2 bg-white p-1 rounded'>
      <p className='text-gray-500 h-6 hover:text-gray-600 overflow-hidden truncate text-sm font-semibold italic'>
        <Link to={`${url}/topArticles/${article?._id}`}>{article?.title}</Link>
      </p>
      <div className='flex space-x-2 text-xs text-gray-400'>
        <span>{article?.upvote?.length} upvotes</span>
        <span>{article?.downvote?.length} downvotes</span>
      </div>
    </div>
  );
};

export default TopArticle;
