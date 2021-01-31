import React from 'react';

const SidebarSVG = ({ d, text, d1 }) => {
  return (
    <li className='flex justify-left px-7 items-center text-lg font-semibold h-10 hover:text-indigo-600 cursor-pointer py-6'>
      <span className='h-full items-center w-7 mr-3'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d={d}
          />
          {d1 && (
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d={d1}
            />
          )}
        </svg>
      </span>
      <span className='h-full'>{text}</span>
    </li>
  );
};

export default SidebarSVG;
