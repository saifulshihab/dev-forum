import React from 'react';

const Alert = ({ success, fail, msg }) => {
  return (
    <div
      className={`mt-2 font-semibold text-sm p-2 px-3 text-center ${
        success
          ? 'bg-green-200 text-green-700'
          : fail && 'bg-red-200 text-red-700'
      }`}
    >
      <i
        className={`fas ${
          success ? 'fa-check-circle' : fail && 'fa-exclamation-circle'
        } mr-1`}
      ></i>

      {msg}
    </div>
  );
};

export default Alert;
