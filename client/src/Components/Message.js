import React from 'react';

const Message = ({ text, user, time }) => {
  return (
    <div className='mb-2 inline-block'>
      <p className='text-xs text-gray-400 pr-3'>{user}</p>
      <div className='p-1 h-auto  rounded-full text-sm px-3 bg-gray-200 text-gray-500'>
        {text}
      </div>
      <p className='ml-3 text-xs text-gray-300'>{time}</p>
    </div>
  );
};

export default Message;
