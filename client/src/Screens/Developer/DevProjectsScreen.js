import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../../Components/Alert';
import Loader from '../../Components/Loader';
import DevProjectContainer from '../../Container/DevProjectContainer';
import {
  getUserProjects,
  addProject,
} from '../../redux/action/DeveloperAction';
import { Field, FieldArray, Formik } from 'formik';
import MyTextField from '../../Components/MyTextField';
import * as yup from 'yup';
import Modal from '../../Components/Modal';

const DevProjectsScreen = ({ user }) => {
  const dispatch = useDispatch();

  const [addProjectModal, setAddProjectModal] = useState(false);

  const fieldValidationSchema = yup.object().shape({
    title: yup
      .string()
      .max(100, 'Not greater than 100!')
      .min(3, 'At least 3 charecter!')
      .required('Required!'),
    description: yup
      .string()
      .max(1500, 'Must be 1500 charecter or less!')
      .min(10, 'At least 10 charecter!')
      .required('Required!'),
    link: yup.string().min(5, 'At least 5 charecter!').url(),
  });

  const userProjects = useSelector((state) => state.userProjects);
  const { loading, projects, success: addSuccess, error } = userProjects;

  useEffect(() => {
    if (addSuccess) {
      setAddProjectModal(false);
    }
    dispatch(getUserProjects(user?._id));
  }, [dispatch, user?._id, addSuccess]);

  return (
    <>
      <div className='text-xl flex items-center justify-between font-semibold text-gray-600'>
        <p>
          <i className='fas mr-2 fa-tasks'></i>Projects ({projects?.length})
        </p>
        <button
          onClick={() => setAddProjectModal(true)}
          className='border text-sm text-gray-500 hover:text-white focus:outline-none hover:border-indigo-500 p-1 rounded px-2 font-semibold hover:bg-indigo-500'
        >
          <i className='mr-2 far fa-plus-square'></i>
          Add Project
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert fail msg={error} />
      ) : projects && projects?.length > 0 ? (
        <DevProjectContainer projects={projects && projects} />
      ) : (
        <Alert msg={'No projects!'} />
      )}
      <div>
        <Modal
          modalOpen={addProjectModal}
          setModalOpen={setAddProjectModal}
          title='Add New Project'
          titleIcon='fas fa-tasks'
        >
          {/* form submission */}
          <Formik
            initialValues={{
              title: '',
              description: '',
              technologies: [],
              link: '',
            }}
            validationSchema={fieldValidationSchema}
            onSubmit={(data, { setSubmitting }) => {
              dispatch(addProject(data));
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
                        placeholder='Project description'
                        rows='3'
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
                  id='link'
                  type='text'
                  name='link'
                  label='Link'
                  placeholder='Project link'
                />
                <FieldArray
                  name='technologies'
                  render={(arrayHelpers) => (
                    <div className='flex items-center mt-2'>
                      <div className='w-2/5'>
                        <label className='block mt-2 text-xs font-semibold text-gray-600 uppercase'>
                          Technology Used
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
                  Add
                </button>
              </form>
            )}
          </Formik>
        </Modal>
      </div>
    </>
  );
};

export default DevProjectsScreen;
