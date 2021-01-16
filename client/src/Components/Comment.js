import React from 'react';

const Comment = ({ cmnt }) => {
  return (
    <>
      <div className='w-full flex bg-white rounded py-2 items-center rounded-md my-2 px-5'>
        <div className='w-full'>
          <div className='text-gray-500 text-sm'>{cmnt.comment}</div>
          <div className='flex text-gray-400 text-xs w-full'>
            <span>2h</span>
            <div className='mx-auto'>
              comment by- @
              <span className='cursor-pointer hover:text-indigo-600 '>
                {cmnt.user.username}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
