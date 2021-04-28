import React, { useState, Fragment, useRef, useEffect } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import QuestionContainer from '../../Container/QuestionContainer';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import SingleQuestionContainer from '../../Container/SingleQuestionContainer';
import { Field, FieldArray, Formik } from 'formik';
import MyTextField from '../../Components/MyTextField';
import * as yup from 'yup';
import { createQuestion } from '../../redux/action/QuestionAction';
import { useDispatch, useSelector } from 'react-redux';

const QuestionScreen = () => {
  const cancelButtonRef = useRef();
  const { path } = useRouteMatch();
  const dispatch = useDispatch();

  const [askQestionModal, setAskQuestionModal] = useState(false);
  const questionsGet = useSelector((state) => state.questionsGet);
  const { createQuestion: createQuestionSuccess } = questionsGet;

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

  useEffect(() => {
    if (createQuestionSuccess) {
      setAskQuestionModal(false);
    }
    return () => {};
  }, [createQuestionSuccess]);

  return (
    <div>
      <div className='h-12 items-center bg-white flex rounded shadow p-2 mt-2'>
        <div className='mx-auto h-full flex-shrink-0 flex items-center justify-center w-12 rounded-full bg-indigo-100 text-indigo-400 sm:mx-0 sm:h-10 sm:w-10'>
          <i className='fas fa-question'></i>
        </div>
        <div
          onClick={() => setAskQuestionModal(!askQestionModal)}
          className='flex items-center text-sm text-gray-400 rounded cursor-pointer ml-2 bg-gray-100 p-2 h-full w-full'
        >
          Ask a Question...
        </div>
      </div>
      <Transition.Root show={askQestionModal} as={Fragment}>
        <Dialog
          as='div'
          static
          className='fixed z-10 inset-0 overflow-y-auto'
          initialFocus={cancelButtonRef}
          open={askQestionModal}
          onClose={setAskQuestionModal}
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
                      <i className='fas fa-question'></i>
                    </div>
                    <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                      <Dialog.Title
                        as='h3'
                        className='text-lg leading-6 font-medium text-gray-900'
                      >
                        Ask Question
                      </Dialog.Title>
                    </div>
                  </div>
                  <div className='mt-2 w-full'>
                    {/* form submission */}
                    <Formik
                      initialValues={{
                        title: '',
                        description: '',
                        tags: [],
                      }}
                      validationSchema={fieldValidationSchema}
                      onSubmit={(data, { setSubmitting }) => {
                        dispatch(createQuestion(data));
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
                          {/* <MyTextField
                            id='description'
                            type='text'
                            name='description'
                            label='Description'
                            placeholder='Question description'
                          /> */}
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
                            Post
                          </button>
                        </form>
                      )}
                    </Formik>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                  {/* <button
                    type='button'
                    className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm'
                    onClick={() => {
                      setAskQuestionModal(false);
                    }}
                  >
                    Post
                  </button> */}
                  <button
                    type='button'
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                    onClick={() => setAskQuestionModal(false)}
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
      <Switch>
        <Route exact path={path} component={QuestionContainer} />
        <Route path={`${path}/questions`} component={QuestionContainer} />
        <Route
          path={`${path}/:questionId`}
          component={SingleQuestionContainer}
        />
      </Switch>
    </div>
  );
};

export default QuestionScreen;
