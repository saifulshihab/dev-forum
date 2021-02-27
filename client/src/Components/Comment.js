import React from 'react';
import moment from 'moment';
import ReactEmoji from 'react-emoji';
import { baseURL } from '../baseURL';
import { Link } from 'react-router-dom';
const Comment = ({ cmnt }) => {
  return (
    <>
      <div className='w-full flex items-center my-2 px-3 mx-3'>
        <div className='w-full'>
          <div className='h-5 overflow-hidden text-gray-500 text-sm flex'>
            <div className='inline-block'>
              <img
                alt={'s'}
                src={baseURL + cmnt?.user?.dp}
                className='rounded-full border-2 border-gray-300 mr-2'
                style={{ width: 20, height: 20 }}
              />
            </div>
            {ReactEmoji.emojify(cmnt?.comment)}
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
      </div>
    </>
  );
};

export default Comment;
