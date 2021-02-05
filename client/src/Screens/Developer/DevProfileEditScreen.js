import React, { useEffect } from 'react';
import { Formik, FieldArray, Field } from 'formik';
import MyTextField from '../../Components/MyTextField';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  editDevAccount,
  fetchDevProfile,
} from '../../redux/action/DeveloperAction';
import Loader from '../../Components/Loader';
import Alert from '../../Components/Alert';

const DevProfileEditScreen = ({ user }) => {
  const dispatch = useDispatch();
  const signInDev = useSelector((state) => state.signInDev);
  const { devInfo } = signInDev;

  const devProfileEdit = useSelector((state) => state.devProfileEdit);

  const {
    loading: editLoading,
    success: editSuccess,
    error: editError,
  } = devProfileEdit;

  useEffect(() => {
    if (editSuccess) {
      dispatch(fetchDevProfile(devInfo.username));
    }
  }, [dispatch, editSuccess, devInfo.username]);

  const fieldValidationSchema = yup.object().shape({
    full_name: yup
      .string()
      .max(35, 'Must be 35 charecters or less!')
      .min(4, 'At least 4 charecter!')
      .required('Required!'),
    username: yup
      .string()
      .max(15, 'Must be 15 charecter or less!')
      .min(4, 'At least 4 charecter!')
      .required('Required!'),
    email: yup.string().email().required('Required!'),
    bio: yup.string().max(150, 'Max 150 charecters').min(5, 'Min 5 charecter'),
    location: yup.string().max(100).min(5, 'Min 5 charecter'),
    website: yup.string().max(100).min(5, 'Min 5 charecter').url(),
    social: yup.array().of(
      yup.object().shape({
        link: yup.string().url(),
      })
    ),
    education: yup.array().of(
      yup.object().shape({
        institute: yup.string().max(100).min(5).required(),
        from: yup
          .number()
          .min(1950, 'Min year 1950!')
          .max(2021, 'Max year 2021!')
          .required(),
        to: yup
          .number()
          .min(1950, 'Min year 1950!')
          .max(2021, 'Max year 2021!'),
        desc: yup.string().max(100),
        type: yup.string().max(50),
      })
    ),
    experience: yup.array().of(
      yup.object().shape({
        company: yup.string().max(100).min(5).required(),
        role: yup.string().max(50).min(5).required(),
        from: yup
          .number()
          .min(1950, 'Min year 1950!')
          .max(2021, 'Max year 2021!')
          .required(),
        to: yup
          .number()
          .min(1950, 'Min year 1950!')
          .max(2021, 'Max year 2021!'),
        desc: yup.string().max(100),
      })
    ),
    github: yup.string().min(1).max(20),
  });

  return (
    <div className=''>
      {editLoading ? (
        <Loader />
      ) : editError ? (
        <Alert fail msg={editError} />
      ) : (
        editSuccess && <Alert success msg={'Profile Updated!'} />
      )}
      <Formik
        initialValues={{
          full_name: user.full_name,
          username: user.username,
          email: user.email,
          bio: user.bio,
          location: user.location,
          website: user.website,
          social: user.social,
          education: user.education,
          experience: user.experience,
          github: user.github,
        }}
        validationSchema={fieldValidationSchema}
        onSubmit={(data, { setSubmitting }) => {
          dispatch(editDevAccount(devInfo.username, { data }));
          setSubmitting(false);
        }}
      >
        {({ values, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <MyTextField
              id='fnamee'
              type='text'
              name='full_name'
              label='Full name'
              placeholder='Your full name'
              flex_content
            />
            <MyTextField
              id='usernamee'
              type='text'
              name='username'
              label='Username'
              placeholder='Username'
              flex_content
            />
            <MyTextField
              id='emaill'
              type='email'
              name='email'
              label='Email'
              placeholder='Email'
              flex_content
            />
            <MyTextField
              id='bioo'
              type='text'
              name='bio'
              label='Bio'
              placeholder='Write a short bio'
              flex_content
            />
            <MyTextField
              id='locationn'
              type='text'
              name='location'
              label='Location'
              placeholder='Your location'
              flex_content
            />
            <MyTextField
              id='websitee'
              type='text'
              name='website'
              label='Website Link'
              placeholder='Enter a Link'
              flex_content
            />
            <MyTextField
              id='githubb'
              type='text'
              name='github'
              label='Github '
              placeholder='Your github username'
              flex_content
            />
            <FieldArray
              name='education'
              render={(arrayHelpers) => (
                <div className='flex items-center mt-2'>
                  <div className='w-2/5'>
                    <label className='block mt-2 text-xs font-semibold text-gray-600 uppercase'>
                      Education
                    </label>
                  </div>
                  <div className='w-3/5'>
                    {values.education.length > 0 ? (
                      values.education.map((data, idx) => (
                        <div key={idx} className='mb-2'>
                          <MyTextField
                            type='text'
                            id='ins'
                            label='Institute'
                            placeholder='Institute Name'
                            name={`education.${idx}.institute`}
                          />
                          <div className='flex space-x-4 items-center mb-1'>
                            <MyTextField
                              type='number'
                              placeholder='Year'
                              id='from'
                              label='From'
                              name={`education.${idx}.from`}
                            />
                            <MyTextField
                              id='to'
                              label='To'
                              type='number'
                              placeholder='Year'
                              name={`education.${idx}.to`}
                            />
                            <MyTextField
                              id='present'
                              label='Present'
                              type='checkbox'
                              className='border py-2 px-3 mr-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 sm:text-sm'
                              name={`education.${idx}.present`}
                            />
                            <MyTextField
                              id='type'
                              label='Level'
                              type='text'
                              placeholder='JSC / SSC / HSC / Bachelor / Masters'
                              name={`education.${idx}.type`}
                            />
                          </div>

                          <MyTextField
                            id='desc'
                            type='text'
                            label='Description'
                            name={`education.${idx}.desc`}
                          />
                          <div className='flex mt-2 items-center space-x-2 justify-center'>
                            <button
                              className='py-1.5 rounded-full text-gray-400 focus:outline-none px-3 border border-gray-300'
                              type='button'
                              onClick={() => arrayHelpers.remove(idx)}
                            >
                              <i className='fas fa-trash'></i>
                            </button>
                            <button
                              className='py-1.5 rounded-full text-gray-400 focus:outline-none px-3 border border-gray-300'
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
                    <label className='block mt-2 text-xs font-semibold text-gray-600 uppercase'>
                      Experience
                    </label>
                  </div>
                  <div className='w-3/5'>
                    {values.experience.length > 0 ? (
                      values.experience.map((data, idx) => (
                        <div key={idx} className='mb-2'>
                          <MyTextField
                            type='text'
                            id='company'
                            placeholder='Company Name'
                            label='Company'
                            name={`experience.${idx}.company`}
                          />
                          <MyTextField
                            type='text'
                            id='role'
                            placeholder='Your role'
                            label='Role / Position'
                            name={`experience.${idx}.role`}
                          />
                          <div className='flex items-center space-x-4 mb-1'>
                            <MyTextField
                              placeholder='Year'
                              id='from'
                              type='number'
                              label='From'
                              name={`experience.${idx}.from`}
                            />
                            <MyTextField
                              id='to'
                              type='number'
                              label='To'
                              placeholder='Year'
                              name={`experience.${idx}.to`}
                            />
                            <MyTextField
                              id='present'
                              type='checkbox'
                              label='Present'
                              className='border py-2 px-3 mr-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 sm:text-sm'
                              name={`experience.${idx}.present`}
                            />
                          </div>
                          <div className='w-full mb-1'>
                            <MyTextField
                              id='desc'
                              type='text'
                              label='Description'
                              name={`experience.${idx}.desc`}
                            />
                          </div>
                          <div className='flex mt-2 items-center space-x-2 justify-center'>
                            <button
                              className='py-1.5 rounded-full text-gray-400 focus:outline-none px-3 border border-gray-300'
                              type='button'
                              onClick={() => arrayHelpers.remove(idx)}
                            >
                              <i className='fas fa-trash'></i>
                            </button>
                            <button
                              className='py-1.5 rounded-full text-gray-400 focus:outline-none px-3 border border-gray-300'
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
                        className='focus:outline-none text-indigo-800 text-sm p-1 px-4 rounded border-dotted border-4 border-light-blue-500'
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
            <FieldArray
              name='social'
              render={(arrayHelpers) => (
                <div className='flex items-center mt-2'>
                  <div className='w-2/5'>
                    <label className='block mt-2 text-xs font-semibold text-gray-600 uppercase'>
                      Social links
                    </label>
                  </div>
                  <div className='w-3/5'>
                    {values.social.length > 0 ? (
                      values.social.map((data, idx) => (
                        <div key={idx} className='mb-2  '>
                          <div className='flex items-center space-x-4 '>
                            <div>
                              <label
                                className='block mt-2 mb-2 text-xs font-semibold text-gray-600 uppercase'
                                htmlFor='platform'
                              >
                                Select platform
                              </label>
                              <Field
                                id='platform'
                                as='select'
                                label='Platform'
                                name={`social.${idx}.platform`}
                                className='border rounded py-1.5 px-2 block focus:outline-none focus:border-indigo-600'
                              >
                                <option value='facebook'>Facebook</option>
                                <option value='instagram'>Instagram</option>
                                <option value='twitter'>Twitter</option>
                                <option value='linkedin'>LinkedIn</option>
                                <option value='github'>GitHub</option>
                                <option value='dribble'>Dribble</option>
                                <option value='behance'>Behance</option>
                                <option value='portfolio'>Portfolio</option>
                                <option value='stackoverflow'>
                                  Stack Overflow
                                </option>
                                <option value='medium'>Medium</option>
                              </Field>
                            </div>

                            <MyTextField
                              id='link'
                              type='text'
                              label='Link'
                              placeholder='Website URL'
                              name={`social.${idx}.link`}
                            />
                          </div>
                          <div className='flex mt-2 items-center space-x-2 justify-center'>
                            <button
                              className='py-1.5 rounded-full text-gray-400 focus:outline-none px-3 border border-gray-300'
                              type='button'
                              onClick={() => arrayHelpers.remove(idx)}
                            >
                              <i className='fas fa-trash'></i>
                            </button>
                            <button
                              className='py-1.5 rounded-full text-gray-400 focus:outline-none px-3 border border-gray-300'
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
                        className='focus:outline-none text-indigo-800 text-sm p-1 px-4 rounded border-dotted border-4 border-light-blue-500'
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
            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full rounded py-2 mt-6 font-medium tracking-widest text-white uppercase text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none'
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
