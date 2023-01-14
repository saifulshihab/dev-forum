import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProject, editProject } from '../redux/action/DeveloperAction';
import { Field, FieldArray, Formik } from 'formik';
import MyTextField from '../Components/MyTextField';
import * as yup from 'yup';
import Modal from './Modal';

const DevProject = ({ project }) => {
  const dispatch = useDispatch();

  const [editProjectModal, setEditProjectModal] = useState(false);

  const userProjects = useSelector((state) => state.userProjects);
  const { success: editSuccess } = userProjects;

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

  useEffect(() => {
    if (editSuccess) {
      setEditProjectModal(false);
    }
  }, [editSuccess]);

  const deleteHandler = () => {
    dispatch(deleteProject(project?._id));
  };
  return (
    <div className='p-3 mb-3 bg-white dark:bg-gray-700 rounded shadow'>
      <div className='border-b flex justify-between items-center pb-1'>
        <div>
          <div className='text-lg font-semibold text-gray-600 dark:text-gray-300'>
            <p>{project?.title}</p>
          </div>
          <div className={`flex mt-1 items-center text-xs`}>
            {project?.technologies?.map((tech, idx) => (
              <span
                key={idx}
                className='pl-1 dark:text-gray-300 dark:bg-gray-600 mr-2 mb-2 text-xs text-gray-500 py-.5 px-1 rounded mb-1'
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className='text-gray-500'>
          <button
            onClick={deleteHandler}
            className='w-8 h-8 text-sm dark:border-gray-600 focus:outline-none hover:text-indigo-600 hover:border-indigo-500 mr-1 border rounded-full'
          >
            <i className='fas fa-trash-alt'></i>
          </button>
          <button
            onClick={() => setEditProjectModal(true)}
            className='w-8 h-8 text-sm dark:border-gray-600 focus:outline-none hover:text-indigo-600 hover:border-indigo-500 border rounded-full'
          >
            <i className='fas fa-edit'></i>
          </button>
        </div>
      </div>
      <div className='mt-2'>
        <p className='text-justify dark:text-gray-300 text-gray-500 text-sm'>
          {project?.description}
        </p>
      </div>
      {project?.link && (
        <div className='mt-1 text-xs text-gray-500'>
          <p>
            <span className='font-semibold mr-1'>Visit:</span>
            <a
              className='hover:text-indigo-500'
              rel='noreferrer'
              target='_blank'
              href={project?.link}
            >
              {project?.link}
            </a>
          </p>
        </div>
      )}
      <div>
        <Modal
          modalOpen={editProjectModal}
          setModalOpen={setEditProjectModal}
          title='Edit Project'
          titleIcon='fas fa-edit'
        >
          {/* form submission */}
          <Formik
            initialValues={{
              title: project?.title,
              description: project?.description,
              technologies: project?.technologies,
              link: project?.link,
            }}
            validationSchema={fieldValidationSchema}
            onSubmit={(data, { setSubmitting }) => {
              dispatch(editProject(project?._id, data));
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
                        className='block mt-2 dark:text-gray-300 text-xs font-semibold text-gray-600 uppercase'
                        htmlFor='description'
                      >
                        Description
                      </label>
                      <textarea
                        className='
                                dark:text-gray-300 dark:border-gray-600 dark:bg-gray-800 appearance-none rounded mt-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 sm:text-sm 
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
                        <label className='dark:text-gray-300 block mt-2 text-xs font-semibold text-gray-600 uppercase'>
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
                              <div className='ml-2 flex text-gray-500 items-center space-x-2 justify-center'>
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
                  Update
                </button>
              </form>
            )}
          </Formik>
        </Modal>
      </div>
    </div>
  );
};

export default DevProject;
