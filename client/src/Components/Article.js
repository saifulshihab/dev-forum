import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Comment from './Comment';

const Article = ({ article }) => {
  const [showComment, setshowComment] = useState(false);
  const [showMore, setshowMore] = useState(false);
  const { url } = useRouteMatch();
  return (
    <>
      <div className='w-full bg-white rounded shadow my-2 px-5 py-2'>
        <div className='flex h-16 items-center pb-2 my-1.5 border-b'>
          <div className='mr-3 w-6 h-full'>
            <div className='w-full cursor-pointer hover:bg-gray-300 bg-gray-200 mb-1 rounded-full text-gray-500'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 15l7-7 7 7'
                />
              </svg>
            </div>
            <div className='w-full cursor-pointer hover:bg-gray-300 bg-gray-200 rounded-full text-gray-500'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </div>
          </div>
          <div className='h-full w-9/12'>
            <div className='h-8 w-auto overflow-hidden '>
              <Link to={`${url}/${article && article._id}`}>
                <div className='text-gray-500 hover:text-indigo-700 cursor-pointer text-xl font-semibold'>
                  {article.title}
                </div>
              </Link>
            </div>
            <div className='text-gray-400 text-xs'>
              <span className='mr-2'>{article.upvote} upvotes</span>
              <span className='mr-4'>{article.downvote} downvotes</span>
              written by- @
              <span className='cursor-pointer hover:text-indigo-600 '>
                {article.user.username}
              </span>
            </div>
          </div>
        </div>

        <div
          className={`mt-3 ${
            showMore ? 'h-full' : 'h-24'
          } max-h-50 overflow-ellipsis ${!showMore && 'overflow-hidden'}`}
        >
          <div className='text-gray-600 text-sm text-justify'>
            {article.description}
          </div>
        </div>
        <span
          onClick={() => setshowMore(!showMore)}
          className='text-xs text-indigo-600 hover:text-indigo-800 cursor-pointer'
        >
          Show{showMore ? ' less' : ' more'}...
        </span>

        <div className='flex   mt-3 border-t cursor-pointer pt-1 text-center'>
          <div
            onClick={() => setshowComment(!showComment)}
            className='flex w-1/2 border-r items-center justify-center hover:text-indigo-600 mr-2 text-gray-500'
          >
            <span className='w-4 mr-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z'
                />
              </svg>
            </span>
            <span className='text-gray-500 hover:text-indigo-600 text-sm'>
              Comment
            </span>
          </div>
          <div className='w-1/2 flex items-center justify-center hover:text-indigo-600 mr-2 text-gray-500'>
            <span className='w-4 mr-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z'
                />
              </svg>
            </span>
            <span className='text-gray-500 hover:text-indigo-600 text-sm'>
              Share
            </span>
          </div>
        </div>
      </div>
      {showComment && (
        <div className='py-2 ml-6'>
          <div className='text-gray-500 text-sm border-b pb-1'>
            <span className='mr-3'>{article.comments.length} Comments</span>
            <span>{article.share} Shares</span>
          </div>
          {article.comments.map((comment) => (
            <Comment cmnt={comment} />
          ))}
        </div>
      )}
    </>
  );
};

export default Article;
