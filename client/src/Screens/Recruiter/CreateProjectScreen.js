import React from 'react';
import { Field, Formik, FieldArray } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import MyTextField from '../../Components/MyTextField';
import * as yup from 'yup';
import Loader from '../../Components/Loader';
import Alert from '../../Components/Alert';
import { postAProject } from '../../redux/action/RecruiterAction';

const CreateProjectScreen = () => {
  const dispatch = useDispatch();

  const postProject = useSelector((state) => state.postProject);
  const { loading, success, error } = postProject;

  const fieldValidationSchema = yup.object().shape({
    title: yup
      .string()
      .max(150, 'Not greater than 100!')
      .min(10, 'At least 10 charecter!')
      .required('Required!'),
    description: yup
      .string()
      .max(3000, 'Must be 3000 charecter or less!')
      .min(10, 'At least 10 charecter!')
      .required('Recuired!'),
    duration: yup
      .number()
      .typeError('Number type!')
      .positive('Must be greater than 0')
      .required('Duration required!'),
    budget: yup
      .number()
      .typeError('Number type!')
      .positive('Must be greater than 0')
      .required('Recuired!'),
  });

  return (
    <div className='bg-white dark:bg-gray-700 rounded p-2 mt-2 px-2'>
      <div>
        {/* form submission */}
        <Formik
          initialValues={{
            title: '',
            description: '',
            technologies: [],
            duration: '',
            budget: '',
          }}
          validationSchema={fieldValidationSchema}
          onSubmit={(data, { setSubmitting }) => {
            dispatch(postAProject(data));
            setSubmitting(false);
          }}
        >
          {({ values, isSubmitting, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <MyTextField
                id='title'
                type='text'
                name='title'
                label='Title'
                placeholder='Project title'
              />
              <Field name='description'>
                {({ field, meta }) => (
                  <div>
                    <label
                      className='dark:text-gray-300 block mt-2 text-xs font-semibold text-gray-600 uppercase'
                      htmlFor='description'
                    >
                      Description
                    </label>
                    <textarea
                      className='
                                appearance-none dark:bg-gray-800 dark:border-gray-600 rounded mt-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 sm:text-sm 
                                '
                      id='description'
                      placeholder='Project description'
                      rows='6'
                      cols='10'
                      {...field}
                    ></textarea>
                    {meta.touched && meta.error ? (
                      <div className='text-red-500 text-sm'>{meta.error}</div>
                    ) : null}
                  </div>
                )}
              </Field>
              <MyTextField
                id='duration'
                type='text'
                name='duration'
                label='Project Duration (in days)'
                placeholder='Project duration'
              />
              <MyTextField
                id='budget'
                type='text'
                name='budget'
                label='Project Budget (in $)'
                placeholder='Project budget'
              />
              <FieldArray
                name='technologies'
                render={(arrayHelpers) => (
                  <div className='flex items-center mt-2'>
                    <div className='w-2/5'>
                      <label className='block dark:text-gray-300 mt-2 text-xs font-semibold text-gray-600 uppercase'>
                        Technologies
                      </label>
                    </div>
                    <div className='w-3/5 border border-blue-300 p-2 rounded'>
                      {values.technologies?.length > 0 ? (
                        values.technologies?.map((data, idx) => (
                          <div
                            key={idx}
                            className='float-left mr-2 flex items-center'
                          >
                            <Field
                              type='text'
                              name={`technologies.${idx}`}
                              value={data}
                              className='border dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 focus:border-indigo-300 rounded focus:outline-none text-sm px-1'
                            />
                            <div className='ml-2 flex text-gray-400 items-center space-x-2 justify-center'>
                              <button
                                type='button'
                                onClick={() => arrayHelpers.remove(idx)}
                              >
                                <i className='far fa-trash-alt'></i>
                              </button>
                              <button
                                type='button'
                                onClick={() => arrayHelpers.insert(idx, '')}
                              >
                                <i className='fas fa-plus'></i>
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <button
                          className='focus:outline-none dark:text-gray-300 text-indigo-800 text-sm p-1 px-4 rounded border-dotted border-4 border-light-blue-500'
                          type='button'
                          onClick={() => arrayHelpers.push('')}
                        >
                          Add Tech
                        </button>
                      )}
                    </div>
                  </div>
                )}
              />
              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full rounded py-2 mt-6 font-medium tracking-widest text-white text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none'
              >
                Post
              </button>
            </form>
          )}
        </Formik>
        <div className='mt-2'>
          {loading ? (
            <Loader />
          ) : error ? (
            <Alert fail msg={error} />
          ) : (
            success && <Alert success msg='Project posted!' />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateProjectScreen;
