import React from 'react';
import { useField } from 'formik';

const MyTextField = ({ label, flex_content, ref, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={flex_content && 'flex items-center'}>
      <label
        htmlFor={props.id || props.name}
        className={`block mt-2 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase ${
          flex_content && 'w-2/5'
        }`}
      >
        {label}
      </label>
      <input
        className={`appearance-none rounded mt-2 relative block w-full px-3 py-2 border border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 sm:text-sm ${
          flex_content && 'w-3/5'
        }`}
        {...field}
        {...props}
        ref={ref}
      />
      {meta.touched && meta.error ? (
        <div className='text-red-500 text-sm'>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MyTextField;
