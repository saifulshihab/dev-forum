import React from 'react';

const DownvoteIcon = ({ color }) => {
  return (
    <div
      className={`w-full cursor-pointer   rounded-full ${
        color
          ? 'bg-indigo-500 text-white '
          : 'bg-gray-200 text-gray-500 hover:bg-gray-300 '
      }`}
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
          d='M19 9l-7 7-7-7'
        />
      </svg>
    </div>
  );
};

export default DownvoteIcon;
