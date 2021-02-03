import React from 'react';
import { Formik, FieldArray, Field } from 'formik';
import MyTextField from '../../Components/MyTextField';

const DevProfileEditScreen = ({ user }) => {
  return (
    <div className=''>
      <Formik
        initialValues={{
          full_name: user.full_name,
          username: user.username,
          email: user.email,
          dp: user.dp,
          cover: user.dp,
          bio: user.bio,
          location: user.location,
          website: user.website,
          social: user.social,
          education: user.education,
          experience: user.experience,
          github: user.github,
        }}
      >
        {({ values, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <MyTextField
              id='fname'
              type='text'
              name='full_name'
              label='Full name'
              placeholder='Your full name'
              flex_content
            />
            <MyTextField
              id='username'
              type='text'
              name='username'
              label='Username'
              placeholder='Username'
              flex_content
            />
            <MyTextField
              id='email'
              type='email'
              name='email'
              label='Email'
              placeholder='Email'
              flex_content
            />
            <MyTextField
              id='bio'
              type='bio'
              name='bio'
              label='Bio'
              placeholder='Write a short bio'
              flex_content
            />
            <MyTextField
              id='location'
              type='location'
              name='location'
              label='Location'
              placeholder='Your location'
              flex_content
            />
            <MyTextField
              id='website'
              type='website'
              name='website'
              label='Website Link'
              placeholder='Enter a Link'
              flex_content
            />
            <MyTextField
              id='location'
              type='location'
              name='location'
              label='Location'
              placeholder='Your address'
              flex_content
            />
            <MyTextField
              id='github'
              type='github'
              name='github'
              label='Github '
              placeholder='Your github username'
              flex_content
            />
            <FieldArray
              name='social'
              render={(arrayHelpers) => (
                <div className='flex items-center mt-2'>
                  <div className='w-2/5'>
                    <label>Social links</label>
                  </div>
                  <div className='w-3/5'>
                    {values.social.length > 0 ? (
                      values.social.map((data, idx) => (
                        <div key={idx} className='mb-2'>
                          <Field
                            name={`social.${idx}.platform`}
                            as={() => (
                              <select className='border py-2 px-3 mr-2 cursor-pointer rounded-none mt-2 relative border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 sm:text-sm'>
                                <option value='facebook'>Facebook</option>
                                <option value='instagram'>Instagram</option>
                                <option value='twitter'>Twitter</option>
                              </select>
                            )}
                          />
                          <Field
                            className='border py-2 px-3 mr-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 sm:text-sm'
                            name={`social.${idx}.link`}
                          />
                          <button
                            className='py-1.5 text-gray-400 focus:outline-none px-3 border border-gray-300 mr-1.5'
                            type='button'
                            onClick={() => arrayHelpers.remove(idx)}
                          >
                            <i className='fas fa-times'></i>
                          </button>
                          <button
                            className='py-1.5 text-gray-400 focus:outline-none px-3 border border-gray-300 w-10'
                            type='button'
                            onClick={() => arrayHelpers.insert(idx, '')}
                          >
                            <i className='fas fa-plus'></i>
                          </button>
                        </div>
                      ))
                    ) : (
                      <button
                        className=' text-indigo-800 text-sm p-1 px-4 rounded border-dotted border-4 border-light-blue-500'
                        type='button'
                        onClick={() => arrayHelpers.push('')}
                      >
                        Add Social Link
                      </button>
                    )}
                  </div>
                </div>
              )}
            />
            <FieldArray
              name='education'
              render={(arrayHelpers) => (
                <div className='flex items-center mt-2'>
                  <div className='w-2/5'>
                    <label>Education</label>
                  </div>
                  <div className='w-3/5'>
                    {values.education.length > 0 ? (
                      values.education.map((data, idx) => (
                        <div key={idx} className='mb-2'>
                          <label
                            className='text-sm text-gray-600 mr-2'
                            htmlFor='ins'
                          >
                            Institute
                          </label>
                          <Field
                            id='from'
                            placeholder='Institute Name'
                            className='border w-full mb-1 py-2 px-3 mr-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 sm:text-sm'
                            name={`education.${idx}.institute`}
                          />
                          <div className='flex items-center mb-1'>
                            <label
                              className='text-sm text-gray-600 mr-2'
                              htmlFor='ins'
                            >
                              From
                            </label>

                            <Field
                              placeholder='Year'
                              id='from'
                              className='border py-2 px-3 mr-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 sm:text-sm'
                              name={`education.${idx}.from`}
                            />
                            <label
                              className='text-sm text-gray-600 mr-2'
                              htmlFor='to'
                            >
                              To
                            </label>

                            <Field
                              id='to'
                              placeholder='Year'
                              className='border py-2 px-3 mr-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 sm:text-sm'
                              name={`education.${idx}.to`}
                            />
                          </div>
                          <label
                            className='text-sm text-gray-600 mr-2'
                            htmlFor='desc'
                          >
                            Description
                          </label>

                          <Field
                            id='desc'
                            className='border w-full mb-1 py-2 px-3 mr-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 sm:text-sm'
                            name={`education.${idx}.description`}
                          />
                          <label
                            className='text-sm text-gray-600 mr-2'
                            htmlFor='present'
                          >
                            Present
                          </label>

                          <Field
                            id='present'
                            type='checkbox'
                            className='border py-2 px-3 mr-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 sm:text-sm'
                            name={`education.${idx}.present`}
                          />
                          <label
                            className='text-sm text-gray-600 mr-2'
                            htmlFor='type'
                          >
                            Level
                          </label>

                          <Field
                            id='type'
                            placeholder='SSC / HSC / Bachelor Degree'
                            className='border py-2 px-3 mr-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 sm:text-sm'
                            name={`education.${idx}.type`}
                          />

                          <button
                            className='py-1.5 text-gray-400 focus:outline-none px-3 border border-gray-300 mr-1.5'
                            type='button'
                            onClick={() => arrayHelpers.remove(idx)}
                          >
                            <i className='fas fa-times'></i>
                          </button>
                          <button
                            className='py-1.5 text-gray-400 focus:outline-none px-3 border border-gray-300 w-10'
                            type='button'
                            onClick={() => arrayHelpers.insert(idx, '')}
                          >
                            <i className='fas fa-plus'></i>
                          </button>
                        </div>
                      ))
                    ) : (
                      <button
                        className=' text-indigo-800 text-sm p-1 px-4 rounded border-dotted border-4 border-light-blue-500'
                        type='button'
                        onClick={() => arrayHelpers.push('')}
                      >
                        Add Education
                      </button>
                    )}
                  </div>
                </div>
              )}
            />
            <FieldArray
              name='experience'
              render={(arrayHelpers) => (
                <div className='flex items-center mt-2'>
                  <div className='w-2/5'>
                    <label>Experience</label>
                  </div>
                  <div className='w-3/5'>
                    {values.experience.length > 0 ? (
                      values.experience.map((data, idx) => (
                        <div key={idx} className='mb-2'>
                          <label
                            className='text-sm text-gray-600 mr-2'
                            htmlFor='company'
                          >
                            Company
                          </label>
                          <Field
                            id='company'
                            placeholder='Company Name'
                            className='border w-full mb-1 py-2 px-3 mr-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 sm:text-sm'
                            name={`experience.${idx}.company`}
                          />
                          <label
                            className='text-sm text-gray-600 mr-2'
                            htmlFor='role'
                          >
                            Role
                          </label>
                          <Field
                            id='role'
                            placeholder='Your role'
                            className='border w-full mb-1 py-2 px-3 mr-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 sm:text-sm'
                            name={`experience.${idx}.role`}
                          />
                          <div className='flex items-center mb-1'>
                            <label
                              className='text-sm text-gray-600 mr-2'
                              htmlFor='from'
                            >
                              From
                            </label>

                            <Field
                              placeholder='Year'
                              id='from'
                              className='border py-2 px-3 mr-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 sm:text-sm'
                              name={`experience.${idx}.from`}
                            />
                            <label
                              className='text-sm text-gray-600 mr-2'
                              htmlFor='to'
                            >
                              To
                            </label>

                            <Field
                              id='to'
                              placeholder='Year'
                              className='border py-2 px-3 mr-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 sm:text-sm'
                              name={`experience.${idx}.to`}
                            />
                          </div>
                          <label
                            className='text-sm text-gray-600 mr-2'
                            htmlFor='present'
                          >
                            Present
                          </label>
                          <Field
                            id='present'
                            type='checkbox'
                            className='border py-2 px-3 mr-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 sm:text-sm'
                            name={`experience.${idx}.present`}
                          />
                          <div className='w-full mb-1'>
                            <label
                              className='text-sm text-gray-600 mr-2'
                              htmlFor='desc'
                            >
                              Description
                            </label>
                            <Field
                              id='desc'
                              className='border w-full py-2 px-3 mr-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 sm:text-sm'
                              name={`experience.${idx}.desc`}
                            />
                          </div>
                          <button
                            className='py-1.5 text-gray-400 focus:outline-none px-3 border border-gray-300 mr-1.5'
                            type='button'
                            onClick={() => arrayHelpers.remove(idx)}
                          >
                            <i className='fas fa-times'></i>
                          </button>
                          <button
                            className='py-1.5 text-gray-400 focus:outline-none px-3 border border-gray-300 w-10'
                            type='button'
                            onClick={() => arrayHelpers.insert(idx, '')}
                          >
                            <i className='fas fa-plus'></i>
                          </button>
                        </div>
                      ))
                    ) : (
                      <button
                        className=' text-indigo-800 text-sm p-1 px-4 rounded border-dotted border-4 border-light-blue-500'
                        type='button'
                        onClick={() => arrayHelpers.push('')}
                      >
                        Add Experience
                      </button>
                    )}
                  </div>
                </div>
              )}
            />
            <button
              className='w-full rounded py-2 mt-6 font-medium tracking-widest text-white uppercase text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none'
              type='submit'
            >
              Update
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default DevProfileEditScreen;
