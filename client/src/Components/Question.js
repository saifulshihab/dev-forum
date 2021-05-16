import { Field, FieldArray, Formik } from 'formik';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { baseURL } from '../baseURL';
import { deleteQuestion, editQuestion } from '../redux/action/QuestionAction';
import Alert from './Alert';
import Loader from './Loader';
import MyTextField from './MyTextField';
import * as yup from 'yup';
import QuestionAnswersContainer from '../Container/QuestionAnswersContainer';
import Modal from './Modal';

const Question = ({ question, details }) => {
  const dispatch = useDispatch();

  const [ansOpen, setAnsOpen] = useState(details ? true : false);  
  const [editModal, setEditModal] = useState(false);

  const { url } = useRouteMatch();
  const history = useHistory();  

  const signInDev = useSelector((state) => state.signInDev);
  const { devInfo } = signInDev;

  const questionDelete = useSelector((state) => state.questionDelete);
  const {
    loading: deleteLoading,
    success: deleteSuccess,
    error: deleteError,
  } = questionDelete;

  const questionEdit = useSelector((state) => state.questionEdit);
  const {
    loading: editLoading,
    success: editSuccess,
    error: editError,
  } = questionEdit;

  useEffect(() => {
    if (deleteSuccess) {
      history.push(`/h/forum/questions`);
    }
    if (editSuccess) {
      setEditModal(false);
    }
    return () => {};
  }, [deleteSuccess, history, editSuccess]);

  const deleteHandler = (id) => {
    dispatch(deleteQuestion(id));
  };

  const fieldValidationSchema = yup.object().shape({
    title: yup
      .string()
      .max(100, 'Not greater than 100!')
      .min(10, 'At least 10 charecter!')
      .required('Required!'),
    description: yup
      .string()
      .max(500, 'Must be 500 charecter or less!')
      .min(10, 'At least 10 charecter!'),
  });

  return (
    <>
      <div className='w-full bg-white shadow rounded-md my-2 px-5 py-2 '>
        <div className='flex items-center'>
          <div className='w-10 h-10'>
            <img
              className='border w-full h-full rounded-full'
              src={baseURL + question?.user?.dp}
              alt={question?.user?.username}
            />
          </div>
          <div className='ml-2 w-40 h-10'>
            <h4 className='text-gray-700 font-medium cursor-pointer hover:text-gray-800'>
              <Link to={`/h/user/${question?.user?.username}`}>
                {question?.user?.full_name}
              </Link>
            </h4>
            <p className='-mt-0.5 text-gray-400 text-xs'>
              {moment(question?.createdAt).startOf('hour').fromNow()}
            </p>
          </div>
        </div>
        <div
          className={`text-gray-600 ${
            !details ? 'hover:text-indigo-700' : ''
          } cursor-pointer text-xl`}
        >
          {!details ? (
            <Link to={`${url}/${question?._id}`}>{question?.title}</Link>
          ) : (
            <span>{question?.title}</span>
          )}
        </div>
        <div className={`flex mt-2 items-center text-xs`}>        
          {question?.tags?.map((tag, idx) => (
            <span
              key={idx}
              className='bg-gray-200 mr-2 mb-2 text-xs text-gray-500 py-.5 px-1 rounded mb-1'
            >
              {tag}
            </span>
          ))}
        </div>
        {details && (
          <div className='text-gray-500 text-sm h-auto w-full text-justify'>
            {question?.description}
          </div>
        )}
        <div
          onClick={() => setAnsOpen(!ansOpen)}
          className='flex items-center justify-center mt-3 border-t cursor-pointer pt-1 text-center text-sm mr-2 text-gray-500'
        >
          <div className='flex  hover:text-indigo-600 items-center justify-center w-1/2'>
            <span className='mr-1'>
              <svg
                style={{ width: '15px' }}
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z'
                />
              </svg>
            </span>
            <span className='text-sm'>Answers</span>
          </div>
          {details &&
            devInfo?._id.toString() === question?.user?._id.toString() && (
              <div
                onClick={() => {
                  setEditModal(true);
                }}
                className='w-1/2  hover:text-indigo-600'
              >
                <span>
                  <i className='mr-1 far fa-edit'></i>Edit
                </span>
              </div>
            )}
          {details &&
            devInfo?._id.toString() === question?.user?._id.toString() && (
              <div
                onClick={() => deleteHandler(question?._id)}
                className='w-1/2  hover:text-indigo-600'
              >
                <span>
                  <i className='mr-1 far fa-trash-alt'></i> Delete
                </span>
              </div>
            )}
          <Modal
            modalOpen={editModal}
            setModalOpen={setEditModal}
            title='Edit Question'
            titleIcon='fas fa-edit'
          >
            {/* form submission */}
            <Formik
              initialValues={{
                title: question?.title,
                description: question?.description,
                tags: question?.tags,
              }}
              validationSchema={fieldValidationSchema}
              onSubmit={(data, { setSubmitting }) => {
                dispatch(editQuestion(question?._id, data));
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
                    placeholder='Question title'
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
                          placeholder='Question description'
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
                  <FieldArray
                    name='tags'
                    render={(arrayHelpers) => (
                      <div className='flex items-center mt-2'>
                        <div className='w-2/5'>
                          <label className='block mt-2 text-xs font-semibold text-gray-600 uppercase'>
                            Tags
                          </label>
                        </div>
                        <div className='w-3/5 border border-blue-300 p-2 rounded'>
                          {values.tags?.length > 0 ? (
                            values.tags?.map((data, idx) => (
                              <div
                                key={idx}
                                className='float-left mr-2 flex items-center'
                              >
                                <Field
                                  type='text'
                                  name={`tags.${idx}`}
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
                              Add Tag
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
        <div className=''>
          {deleteLoading ? (
            <Loader />
          ) : (
            deleteError && <Alert fail msg={deleteError} />
          )}
          {editLoading ? (
            <Loader />
          ) : editError ? (
            <Alert fail msg={editError} />
          ) : (
            editSuccess && <Alert success msg={'Question Updated!'} />
          )}
        </div>
      </div>
      <div>
        {ansOpen && <QuestionAnswersContainer question={question} details />}
      </div>
    </>
  );
};

export default Question;
