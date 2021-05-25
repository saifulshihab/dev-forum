import React from 'react';
import moment from 'moment';
import ReactEmoji from 'react-emoji';
import { baseURL } from '../baseURL';
import { Link } from 'react-router-dom';
const Comment = ({ cmnt }) => {
  return (
    <>
      <div className='w-full mb-2 flex flex-col my-2 px-3 mx-3'>
        <div className='h-auto overflow-hidden text-gray-500 text-sm flex items-center'>
          <div className='h-4 w-4 mr-1'>
            <Link to={`/h/user/${cmnt?.user?.username}`}>
              <img
                alt={'user dp'}
                src={baseURL + cmnt?.user?.dp}
                className='w-full h-full rounded-full border border-gray-300'
              />
            </Link>
          </div>
          <div className='w-full text-justify p-1'>
            {ReactEmoji.emojify(cmnt?.comment)}
          </div>
        </div>
        <div className='flex text-gray-400 text-xs w-full'>
          <span>{moment(cmnt.createdAt).startOf('m').fromNow(true)}</span>
          <div className='ml-3'>
            @
            <span className='cursor-pointer hover:text-indigo-600 '>
              <Link to={`/h/user/${cmnt?.user?.username}`}>
                {cmnt?.user?.username}
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
