import React from 'react';
import { Formik, Field } from 'formik';
import MyTextField from '../../Components/MyTextField';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../../Components/Alert';
import { articleCreate } from '../../redux/action/ArticleAction';

const CreateArticleScreen = () => {
  const dispatch = useDispatch();
  const createArticle = useSelector((state) => state.createArticle);
  const { loading, success, error } = createArticle;

  const formValidationSchema = yup.object().shape({
    title: yup
      .string()
      .min(3, 'Minimum 3 character!')
      .max(100, 'Maximum 100 character!')
      .required('Title Required!'),
    description: yup
      .string()
      .min(50, 'Minimum 50 character!')
      .max(2000, 'Maximum 2000 character!')
      .required('Description Required!'),
  });
  return (
    <div className='bg-white px-3 py-2 rounded shadow'>
      <div>
        <h2 className='font-semibold text-gray-600 text-xl'>
          Write an Article
        </h2>
      </div>
      <Formik
        initialValues={{ title: '', description: '' }}
        validationSchema={formValidationSchema}
        onSubmit={(data, { setSubmitting }) => {
          dispatch(articleCreate(data));
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <MyTextField
              label='Title'
              name='title'
              type='text'
              placeholder='Article Title'
            />
            <label
              htmlFor='img'
              className='block mt-2 mb-1 font-semibold text-xs text-gray-600 uppercase'
            >
              Description
            </label>
            <Field name='description'>
              {({ field, meta }) => (
                <div>
                  <textarea
                    type='text'
                    rows='15'
                    className='mt-2 w-full border rounded text-sm focus:outline-none focus:border-indigo-500 p-2'
                    placeholder='Write description...'
                    {...field}
                  ></textarea>
                  {meta.touched && meta.error ? (
                    <div className='text-red-500 text-sm'>{meta.error}</div>
                  ) : null}
                </div>
              )}
            </Field>
            <label
              htmlFor='img'
              className='block mt-2 mb-1 font-semibold text-xs text-gray-600 uppercase'
            >
              Add image
            </label>
            <input id='img' type='file' className='text-sm mt-2 mb-2' />
            <button
              className={`text-white bg-indigo-600 ${
                loading && 'bg-indigo-300'
              } focus:outline-none focus:bg-indigo-500 py-1.5 w-full rounded font-semibold mt-2'
              type='submit`}
              disabled={isSubmitting}
            >
              {loading ? 'Posting...' : 'Post'}
            </button>
            {success ? (
              <Alert success msg={'Article posted!'} />
            ) : (
              error && <Alert fail msg={error} />
            )}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CreateArticleScreen;
