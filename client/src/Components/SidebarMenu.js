import React from 'react';

const SidebarSVG = ({ fontAwesome, text }) => {
  return (
    <div className='w-full px-4 h-10 mb-1 rounded-full hover:bg-indigo-100 dark:hover:bg-transparent flex justify-start items-center text-lg font-semibold hover:text-indigo-600 cursor-pointer'>
      <div className='w-auto mr-3'>
        <i className={fontAwesome}></i>
      </div>
      <div className='hidden md:block'>{text}</div>
    </div>
  );
};

export default SidebarSVG;
