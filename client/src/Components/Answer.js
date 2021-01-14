import React from 'react';

const Answer = ({ ans }) => {
  return (
    <>
      <div className='w-4/5 flex items-center rounded-md my-2 px-5 py-1'>
        <div className='mr-3 h-10 w-5'>
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
        <div className=''>
          <div className='text-gray-500 text-sm'>{ans.answer}</div>
          <div className='text-gray-400 text-xs'>
            <span className='mr-2'>{ans.upvote} upvotes</span>
            <span className='mr-4'>{ans.downvote} downvotes</span>
            answered by- @
            <span className='cursor-pointer hover:text-indigo-600 '>
              {ans.user.username}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Answer;
