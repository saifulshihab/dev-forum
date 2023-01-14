import { motion } from 'framer-motion';
import React from 'react';

const Message = ({ text, userName, time, right }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0.7 }}
      animate={{ y: 0, opacity: 1 }}
      className={`mb-2 h-auto ${right && 'text-right'}`}
    >
      <div className={`inline-block`}>
        <p className="text-xs text-gray-400 pr-3">{userName}</p>
        <div
          className={`bg-gray-200 p-1 h-auto rounded-full ${
            right && 'bg-indigo-500 text-white'
          }`}
        >
          <p className="px-2 text-sm">{text}</p>
        </div>
        <p className="ml-3 text-xs text-gray-300">{time}</p>
      </div>
    </motion.div>
  );
};

export default Message;
