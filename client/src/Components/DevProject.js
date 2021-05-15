import React, { useState, Fragment, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProject, editProject } from '../redux/action/DeveloperAction';
import { Transition, Dialog } from '@headlessui/react';
import { Field, FieldArray, Formik } from 'formik';
import MyTextField from '../Components/MyTextField';
import * as yup from 'yup';

const DevProject = ({ project }) => {
  const dispatch = useDispatch();

  const cancelButtonRef = useRef();

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
    <div className='p-3 mb-3 bg-white rounded shadow'>
      <div className='border-b flex justify-between items-center pb-1'>
        <div>
          <div className='text-lg font-semibold text-gray-600'>
            <p>{project?.title}</p>
          </div>
          <div className={`flex mt-1 items-center text-xs`}>
            {project?.technologies?.map((tech, idx) => (
              <span
                key={idx}
                className='bg-gray-200 mr-2 mb-2 text-xs text-gray-500 py-.5 px-1 rounded mb-1'
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className='text-gray-500'>
          <button
            onClick={deleteHandler}
            className='w-8 h-8 text-sm focus:outline-none hover:text-indigo-600 hover:border-indigo-500 mr-1 border rounded-full'
          >
            <i className='fas fa-trash-alt'></i>
          </button>
          <button
            onClick={() => setEditProjectModal(true)}
            className='w-8 h-8 text-sm focus:outline-none hover:text-indigo-600 hover:border-indigo-500 border rounded-full'
          >
            <i className='fas fa-edit'></i>
          </button>
        </div>
      </div>
      <div className='mt-2'>
        <p className='text-justify text-gray-500 text-sm'>
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
        <Transition.Root
          style={{ zIndex: 1000 }}
          show={editProjectModal}
          as={Fragment}
        >
          <Dialog
            as='div'
            static
            className='fixed z-10 inset-0 overflow-y-auto'
            initialFocus={cancelButtonRef}
            open={editProjectModal}
            onClose={setEditProjectModal}
          >
            <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className='hidden sm:inline-block sm:align-middle sm:h-screen'
                aria-hidden='true'
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              >
                <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
                  <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                    <div className='sm:flex sm:items-start'>
                      <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-400 sm:mx-0 sm:h-10 sm:w-10'>
                        <i className='fas fa-tasks'></i>
                      </div>
                      <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                        <Dialog.Title
                          as='h3'
                          className='text-lg leading-6 font-medium text-gray-900'
                        >
                          Edit Project
                        </Dialog.Title>
                      </div>
                    </div>
                    <div className='mt-2 w-full'>
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
                                    <div className='text-red-500 text-sm'>
                                      {meta.error}
                                    </div>
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
                                          <div className='ml-2 flex text-gray-500 items-center space-x-2 justify-center'>
                                            <button
                                              type='button'
                                              onClick={() =>
                                                arrayHelpers.remove(idx)
                                              }
                                            >
                                              <i className='far fa-trash-alt'></i>
                                            </button>
                                            <button
                                              type='button'
                                              onClick={() =>
                                                arrayHelpers.insert(idx, '')
                                              }
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
                              Update
                            </button>
                          </form>
                        )}
                      </Formik>
                    </div>
                  </div>
                  <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                    <button
                      type='button'
                      className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                      onClick={() => setEditProjectModal(false)}
                      ref={cancelButtonRef}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </div>
  );
};

export default DevProject;
