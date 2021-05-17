import { Field, FieldArray, Formik } from 'formik';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Modal from './Modal';
import Spinner from './Spinner';
import MyTextField from './MyTextField';
import * as yup from 'yup';
import {
  deleteCircular,
  editCircular,
  getRecruiterCirculars,
} from '../redux/action/CircularAction';
import { useDispatch, useSelector } from 'react-redux';
import Alert from './Alert';

const JobCircular = ({ circular, noRoute, recruiter, details, developer }) => {
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const signInRec = useSelector((state) => state.signInRec);
  const { recInfo } = signInRec;

  const circularDel = useSelector((state) => state.circularDel);
  const { success: deleteSuccess, error: deleteError } = circularDel;

  const circularEdit = useSelector((state) => state.circularEdit);
  const {
    loading: editLoading,
    success: editSuccess,
    error: editError,
  } = circularEdit;

  useEffect(() => {
    if (deleteSuccess) {
      setDeleteModal(false);
      dispatch(getRecruiterCirculars(recInfo?._id));
    }
    if (editSuccess) {
      setEditModal(false);
      dispatch(getRecruiterCirculars(recInfo?._id));
    }
  }, [dispatch, deleteSuccess, recInfo, editSuccess]);

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
    salaryFrom: yup
      .number()
      .typeError('Number only')
      .positive('Must be greater than 0'),
    salaryTo: yup
      .number()
      .typeError('Number only')
      .positive('Must be greater than 0'),
  });

  const deleteCircularHandler = () => {
    dispatch(deleteCircular(circular?._id));
  };

  return (
    <div className='w-full h-42 bg-white p-2 px-4 mb-2 text-gray-600 rounded shadow'>
      {!noRoute ? (
        <Link to={`${url}/${circular?._id}`}>
          <p className='w-full text-xl hover font-semibold hover:text-indigo-600 cursor-pointer'>
            {circular?.role}
          </p>
        </Link>
      ) : (
        <p className='w-full text-xl hover font-semibold hover:text-indigo-600 cursor-pointer'>
          {circular?.role}
        </p>
      )}
      <div className={`flex mt-1 items-center text-xs`}>
        {circular?.skills?.map((skill, idx) => (
          <span
            key={idx}
            className='bg-gray-200 mr-2 mb-1text-xs text-gray-500 py-.5 px-1 rounded mb-1'
          >
            {skill}
          </span>
        ))}
      </div>
      <div className='-mt-1 mb-1'>
        <p className='font-semibold'>Company : {circular?.company}</p>
      </div>
      <div className='pb-1 flex items-center justify-between text-xs'>
        <p>
          <i className='fas fa-map-marker-alt mr-1'></i>
          {circular?.location}
        </p>
        <p>
          <i className='fas fa-briefcase mr-1'></i>
          {circular?.jobType}
        </p>
        <p className='italic'>
          <span className='font-semibold'>Salary:</span>
          <span className='ml-1 text-green-500'>
            {circular?.negotiable
              ? ' Negotiable'
              : `${circular?.salaryFrom}K-${circular?.salaryTo}K (BDT/Monthly)`}
          </span>
        </p>
      </div>
      {details && (
        <div className='mt-1 mb-1 border-t'>
          <div>
            <p className='font-semibold mb-1'>Job Description</p>
          </div>
          <div className='text-sm text-justify text-gray-500'>
            {circular?.jobDescription}
          </div>
        </div>
      )}
      <div className='mt-1'>
        <p className='italic text-xs text-gray-400'>
          <i className='fas fa-clock mr-1'></i>Posted{' '}
          {moment(circular?.createdAt).fromNow(false)}
        </p>
      </div>
      <div
        className={`mt-1 ${
          recruiter && 'border-t pt-1'
        }text-xs text-center cursor-pointer flex items-center`}
      >
        {recruiter && (
          <div className='w-1/2  hover:text-indigo-600'>
            <button
              className='focus:outline-none text-xs'
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
              className='focus:outline-none text-xs'
            >
              <i className='mr-1 far fa-trash-alt'></i> Delete
            </button>
          </div>
        )}
      </div>
      {developer && (
        <div className='mt-1 w-full'>
          <button className='w-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none text-sm text-white p-2 font-semibold rounded'>
            Apply Now
          </button>
        </div>
      )}
      <Modal
        modalOpen={editModal}
        setModalOpen={setEditModal}
        title='Edit Circular'
        titleIcon='fas fa-edit'
        large
      >
        {/* form submission */}
        <Formik
          initialValues={{
            role: circular?.role,
            company: circular?.company,
            jobDescription: circular?.jobDescription,
            skills: circular?.skills,
            location: circular?.location,
            negotiable: circular?.negotiable,
            salaryFrom: circular?.salaryFrom,
            salaryTo: circular?.salaryTo,
            jobType: circular?.jobType,
          }}
          validationSchema={fieldValidationSchema}
          onSubmit={(data, { setSubmitting }) => {
            dispatch(editCircular(circular?._id, data));
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
                        <select
                          {...field}
                          className='w-full border text-sm rounded py-1.5 px-2 block focus:outline-none focus:border-indigo-600'
                        >
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
                {editLoading ? <Spinner small /> : 'Update'}
              </button>
              {editError && <Alert fail msg={editError} />}
            </form>
          )}
        </Formik>
      </Modal>
      <Modal
        modalOpen={deleteModal}
        setModalOpen={setDeleteModal}
        title='Delete Circular'
        titleIcon='fas fa-trash'
        footerYesButton
        yesBtnAction={deleteCircularHandler}
      >
        <p>Are you sure you want to delete this circular?</p>
        {deleteError && <Alert fail msg={deleteError} />}
      </Modal>
    </div>
  );
};

export default JobCircular;
