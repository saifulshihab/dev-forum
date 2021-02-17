import React from 'react';
import { useField } from 'formik';
import { Editor } from '@tinymce/tinymce-react';

const MyEditor = ({ label, ref, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label
        htmlFor={props.id || props.name}
        className={`block mt-2 text-xs font-semibold text-gray-600 uppercase`}
      >
        {label}
      </label>
      <Editor {...field} {...props} ref={ref} />
      {meta.touched && meta.error ? (
        <div className='text-red-500 text-sm'>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MyEditor;
