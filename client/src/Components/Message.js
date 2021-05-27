import React from 'react';

const Message = ({ text, userName, time, right }) => {  
  return (
    <div className={`mb-2 h-auto ${right && 'text-right'}`}>
      <div className={`inline-block`}>
        <p className='text-xs text-gray-400 pr-3'>{userName}</p>
        <div
          className={`bg-gray-200 p-1 h-auto rounded-full ${right && 'bg-indigo-500 text-white'}`}
        >
          <p className='px-2 text-sm'>{text}</p>
        </div>
        <p className='ml-3 text-xs text-gray-300'>{time}</p>
      </div>
    </div>
  );
};

export default Message;
