import React from 'react';

const UpvoteIcon = ({ color, fromAnswer }) => {
  return (
    <div
      className={`${fromAnswer ? 'w-5' : 'w-full'} cursor-pointer  ${
        color
          ? 'bg-indigo-500 text-white '
          : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-300 '
      } rounded-full`}
    >
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
  );
};

export default UpvoteIcon;
