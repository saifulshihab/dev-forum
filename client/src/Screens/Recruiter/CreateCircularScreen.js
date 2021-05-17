import React from 'react';
import { Field, Formik, FieldArray } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import MyTextField from '../../Components/MyTextField';
import * as yup from 'yup';
import Loader from '../../Components/Loader';
import Alert from '../../Components/Alert';
import { postCircular } from '../../redux/action/CircularAction';

const CreateCircularScreen = () => {
  const dispatch = useDispatch();

  const circlarPost = useSelector((state) => state.circlarPost);
  const { loading, success, error } = circlarPost;

  const fieldValidationSchema = yup.object().shape({
    role: yup
      .string()
      .max(150, 'Not greater than 100!')
      .min(10, 'At least 10 charecter!')
      .required('Required!'),
    company: yup
      .string()
      .max(150, 'Not greater than 100!')
      .min(10, 'At least 10 charecter!')
      .required('Required!'),
    jobDescription: yup
      .string()
      .max(5000, 'Must be 5000 charecter or less!')
      .min(10, 'At least 10 charecter!')
      .required('Required!'),
    location: yup
      .string()
      .min(3, 'At least 3 character!')
      .required('Required!'),
    jobType: yup.string().required('Required!'),
    negotiable: yup.boolean().default(false),
    salaryFrom: yup
      .number()
      .typeError('Number only')
      .positive('Must be greater than 0'),
    salaryTo: yup
      .number()
      .typeError('Number only')
      .positive('Must be greater than 0'),
  });

  return (
    <div className='bg-white rounded p-2 mt-2 px-2'>
      <div>
        {/* form submission */}
        <Formik
          initialValues={{
            role: '',
            company: '',
            jobDescription: '',
            skills: [],
            location: '',
            negotiable: false,
            salaryFrom: '',
            salaryTo: '',
            jobType: '',
          }}
          validationSchema={fieldValidationSchema}
          onSubmit={(data, { setSubmitting }) => {
            dispatch(postCircular(data));
            setSubmitting(false);
          }}
        >
          {({ values, isSubmitting, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <MyTextField
                id='role'
                type='text'
                name='role'
                label='Role'
                placeholder='Job role e.g (Software Engineer)'
              />
              <MyTextField
                id='company'
                type='text'
                name='company'
                label='Company Name'
                placeholder='e.g Google, Amazon, Netflix'
              />
              <Field name='jobDescription'>
                {({ field, meta }) => (
                  <div>
                    <label
                      className='block mt-2 text-xs font-semibold text-gray-600 uppercase'
                      htmlFor='description'
                    >
                      Description
                    </label>
                    <textarea
                      className='
                                appearance-none rounded mt-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 sm:text-sm 
                                '
                      id='description'
                      placeholder='Job description'
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
                id='location'
                type='text'
                name='location'
                label='Location'
                placeholder='Job location'
              />
              <div className='flex items-center justify-between mt-2 mb-2 w-full'>
                <div>
                  <label
                    className={`block mb-2 mt-2 text-xs font-semibold text-gray-600 uppercase`}
                  >
                    Job Type
                  </label>
                  <Field name='jobType'>
                    {({ field, meta }) => (
                      <>
                        <select {...field} className='w-full border text-sm rounded py-1.5 px-2 block focus:outline-none focus:border-indigo-600'>
                          <option value=''> --- </option>
                          <option value='Full-Time'>Full-Time</option>
                          <option value='Part-Time'>Part-Time</option>
                          <option value='Remote'>Remote</option>
                          <option value='Contract'>Contract</option>
                        </select>
                        {meta.touched && meta.error ? (
                          <div className='text-red-500 text-sm'>
                            {meta.error}
                          </div>
                        ) : null}
                      </>
                    )}
                  </Field>
                </div>
                <div>
                  <MyTextField
                    id='negotiable'
                    type='checkbox'
                    label='Salary negotiable'
                    className='border py-2 px-3 mr-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 sm:text-sm'
                    name='negotiable'
                  />
                </div>
                {!values?.negotiable && (
                  <div>
                    <MyTextField
                      id='salaryFrom'
                      type='text'
                      name='salaryFrom'
                      label='Salary'
                      placeholder='Start e.g (20K)'
                    />
                  </div>
                )}
                {!values?.negotiable && (
                  <div>
                    <MyTextField
                      id='salaryTo'
                      type='text'
                      name='salaryTo'
                      label='Salary'
                      placeholder='End e.g (30K)'
                    />
                  </div>
                )}
              </div>
              <FieldArray
                name='skills'
                render={(arrayHelpers) => (
                  <div className='flex items-center mt-2'>
                    <div className='w-2/5'>
                      <label className='block mt-2 text-xs font-semibold text-gray-600 uppercase'>
                        Recruired Skills
                      </label>
                    </div>
                    <div className='w-3/5 border border-blue-300 p-2 rounded'>
                      {values.skills?.length > 0 ? (
                        values.skills?.map((data, idx) => (
                          <div
                            key={idx}
                            className='float-left mr-2 flex items-center'
                          >
                            <Field
                              type='text'
                              name={`skills.${idx}`}
                              value={data}
                              className='border focus:border-indigo-300 rounded focus:outline-none text-sm px-1'
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
                          className='focus:outline-none  text-indigo-800 text-sm p-1 px-4 rounded border-dotted border-4 border-light-blue-500'
                          type='button'
                          onClick={() => arrayHelpers.push('')}
                        >
                          Add Skill
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
            success && <Alert success msg='Circular posted!' />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCircularScreen;
