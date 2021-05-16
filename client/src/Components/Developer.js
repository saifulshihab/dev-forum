import React from 'react';
import { Link } from 'react-router-dom';
import { baseURL } from '../baseURL';

const Developer = ({ user }) => {
  return (
    <div className='bg-white rounded p-2 shadow mb-2 flex items-center justify-between'>
      <div className='flex items-center'>
        <div className='w-10 h-10 mr-2'>
          <Link to={`/h/user/${user?.username}`}>
            <img
              className='w-full h-full rounded-full'
              src={baseURL + user?.dp}
              alt='dp'
            />
          </Link>
        </div>
        <div className='text-gray-500'>
          <Link to={`/h/user/${user?.username}`}>
            <p className='hover:text-indigo-500 font-semibold'>{user?.full_name}</p>
          </Link>
          <p className='-mt-1 text-xs italic'>{user?.bio}</p>
          <div className={`flex mt-1 items-center text-xs`}>
            {user?.topSkills?.map((skill, idx) => (
              <span
                key={idx}
                className='bg-gray-200 mr-2 mb-2 text-xs text-gray-500 py-.5 px-1 rounded mb-1'
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className=''>
        <button className='text-sm text-gray-500 border border-gray-400 py-1 px-3 rounded-md focus:outline-none hover:bg-indigo-500 hover:text-white'>
          <i className='fas fa-user-plus mr-1'></i>Follow
        </button>
      </div>
    </div>
  );
};

export default Developer;
