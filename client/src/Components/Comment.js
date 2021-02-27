import React from 'react';
import moment from 'moment';
import ReactEmoji from 'react-emoji';

const Comment = ({ cmnt }) => {
  return (
    <>
      <div className='w-full flex items-center my-2 px-3 mx-3'>
        <div className='w-full'>
          <div className='h-5 overflow-hidden text-gray-500 text-sm flex'>
            {ReactEmoji.emojify(cmnt?.comment)}
          </div>
          <div className='flex text-gray-400 text-xs w-full'>
            <span>{moment(cmnt.createdAt).startOf('m').fromNow(true)}</span>
            <div className='ml-3'>
              @
              <span className='cursor-pointer hover:text-indigo-600 '>
                {cmnt?.user?.username}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
