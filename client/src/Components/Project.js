import React, { useEffect, useState } from 'react';
import { Formik, Field, FieldArray } from 'formik';
import Modal from './Modal';
import Alert from './Alert';
import MyTextField from './MyTextField';
import * as yup from 'yup';
import { Link, useRouteMatch } from 'react-router-dom';
import moment from 'moment';
import {
  deleteRecProject,
  editRecProject,
} from '../redux/action/RecruiterAction';
import { useDispatch, useSelector } from 'react-redux';

const Project = ({ project, recruiter, noRoute }) => {
  const dispatch = useDispatch();
  const { url } = useRouteMatch();

  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const projectEdit = useSelector((state) => state.projectEdit);
  const {
    loading: editLoading,
    success: editSuccess,
    error: editError,
  } = projectEdit;

  const projectDelete = useSelector((state) => state.projectDelete);
  const { success: deleteSuccess, error: deleteError } = projectDelete;

  useEffect(() => {
    if (editSuccess) {
      setEditModal(false);
    }
    if (deleteSuccess) {
      setDeleteModal(false);
    }
    return () => {};
  }, [editSuccess, deleteSuccess]);

  const fieldValidationSchema = yup.object().shape({
    title: yup
      .string()
      .max(150, 'Not greater than 100!')
      .min(10, 'At least 10 charecter!')
      .required('Required!'),
    description: yup
      .string()
      .max(3000, 'Must be 3000 charecter or less!')
      .min(10, 'At least 10 charecter!'),
    duration: yup
      .number()
      .typeError('Number type!')
      .positive('Must be greater than 0')
      .required('Duration required!'),
    budget: yup
      .number()
      .typeError('Number type!')
      .positive('Must be greater than 0'),
  });
  const projectdeleteHandler = () => {
    dispatch(deleteRecProject(project?._id));
  };
  return (
    <div className='bg-white p-3 text-gray-500 rounded shadow mb-2 text-justify'>
      <div className='w-full h-auto'>
        {!noRoute ? (
          <Link to={`${url}/${project?._id}`}>
            <p className='text-lg cursor-pointer hover:text-indigo-500 font-semibold'>
              {project?.title}
            </p>
          </Link>
        ) : (
          <p className='text-lg cursor-pointer hover:text-indigo-500 font-semibold'>
            {project?.title}
          </p>
        )}
      </div>
      <div className='w-full text-sm  mt-2 h-auto'>
        <p>{project?.description}</p>
      </div>
      <div className='text-xs flex mt-2 items-center justify-between italic'>
        <span>
          <i className='far fa-clock mr-1'></i>
          <strong>Posted:</strong> {moment(project?.createdAt).fromNow(false)}
        </span>
        <span>
          <i className='far fa-clock mr-1'></i>
          <strong>Duration:</strong> {project?.duration} days
        </span>
        <span>
          <i className='fas fa-money-check-alt mr-1'></i>
          <strong>Budget:</strong> ${project?.budget}
        </span>
      </div>
      <div className='mt-1 text-xs '>
        <div className='flex items-center'>
          <div className='mr-1'>
            <i className='fas fa-code mr-1'></i>
            <strong>Technologies:</strong>
          </div>
          <div className={`flex mt-2 items-center text-xs`}>
            {project?.technologies?.map((tech, idx) => (
              <span
                key={idx}
                className='bg-gray-200 mr-1 mb-2 text-xs text-gray-500 py-.5 px-1 rounded mb-1'
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className='mt-1 border-t pt-1 text-xs text-center cursor-pointer flex items-center'>
        {recruiter && (
          <div className='w-1/2  hover:text-indigo-600'>
            <button
              className='focus:outline-none'
              onClick={() => setEditModal(!editModal)}
            >
              <i className='mr-1 far fa-edit'></i>Edit
            </button>
          </div>
        )}
        {recruiter && (
          <div className='w-1/2  hover:text-indigo-600'>
            <button
              onClick={() => setDeleteModal(!deleteModal)}
              className='focus:outline-none'
            >
              <i className='mr-1 far fa-trash-alt'></i> Delete
            </button>
          </div>
        )}
      </div>
      <Modal
        title='Edit Project'
        titleIcon='fas fa-edit'
        modalOpen={editModal}
        setModalOpen={setEditModal}
      >
        <Formik
          initialValues={{
            title: project?.title,
            description: project?.description,
            technologies: project?.technologies,
            duration: project?.duration,
            budget: project?.budget,
          }}
          validationSchema={fieldValidationSchema}
          onSubmit={(data, { setSubmitting }) => {
            dispatch(editRecProject(project?._id, data));
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
                      <label className='block mt-2 text-xs font-semibold text-gray-600 uppercase'>
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
                {editLoading ? 'Updating...' : 'Update'}
              </button>
            </form>
          )}
        </Formik>
      </Modal>
      {editError && <Alert fail msg={editError} />}
      <Modal
        title='Delete Project'
        titleIcon='fas fa-trash-alt'
        modalOpen={deleteModal}
        setModalOpen={setDeleteModal}
        footerYesButton
        yesBtnAction={projectdeleteHandler}
      >
        <p className='text-md text-gray-500 font-semibold'>
          Are you sure you want to delete this project?
        </p>
        {deleteError && <Alert fail msg={deleteError} />}
      </Modal>
    </div>
  );
};

export default Project;
