import React from 'react';
import { Link } from 'react-router-dom';

const RegFirstStep = () => {
  return (
    <div className='px-4 mt-16 text-center '>
      <span className='text-2xl text-gray-500 dark:text-gray-100 font-bold inline-block mx-auto'>
        I Want to Start Here As a
      </span>
      <div className='mt-5 flex justify-center'>
        <div className='mt-5 sm:mt-8 mr-5 sm:flex sm:justify-center lg:justify-start'>
          <div className='rounded-md shadow'>
            <Link
              to='/registration'
              className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10'
            >
              Developer
            </Link>
          </div>
        </div>
        <div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start'>
          <div className='rounded-md shadow'>
            <Link
              to='/re-registration'
              className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md bg-indigo-100 hover:bg-indigo-200 hover:text-white md:py-4 md:text-lg md:px-10'
            >
              Recruiter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegFirstStep;
