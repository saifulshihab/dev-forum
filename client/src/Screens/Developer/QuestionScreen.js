import React, { useState, useEffect } from 'react';
import QuestionContainer from '../../Container/QuestionContainer';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import SingleQuestionContainer from '../../Container/SingleQuestionContainer';
import { Field, FieldArray, Formik } from 'formik';
import MyTextField from '../../Components/MyTextField';
import * as yup from 'yup';
import { createQuestion } from '../../redux/action/QuestionAction';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../Components/Modal';
import Spinner from '../../Components/Spinner';
import Alert from '../../Components/Alert';

const QuestionScreen = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);

  const questionCreate = useSelector((state) => state.questionCreate);
  const {
    loading: createQLoading,
    success: createQSuccess,
    error: createQError,
  } = questionCreate;

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
    if (createQSuccess) {
      setModalOpen(false);
    }
    return () => {};
  }, [createQSuccess]);

  return (
    <div>
      <div className='h-12 items-center bg-white flex rounded shadow p-2 mt-2'>
        <div className='mx-auto h-full flex-shrink-0 flex items-center justify-center w-12 rounded-full bg-indigo-100 text-indigo-400 sm:mx-0 sm:h-10 sm:w-10'>
          <i className='fas fa-question'></i>
        </div>
        <div
          onClick={() => setModalOpen(!modalOpen)}
          className='flex items-center text-sm text-gray-400 rounded cursor-pointer ml-2 bg-gray-100 p-2 h-full w-full'
        >
          Ask a Question...
        </div>
      </div>
      {createQError && <Alert fail msg={createQError} />}
      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        title='Ask Question'
        titleIcon='fas fa-question'
      >
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
                      <div className='text-red-500 text-sm'>{meta.error}</div>
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
                {createQLoading ? <Spinner /> : 'Post'}
              </button>
            </form>
          )}
        </Formik>
      </Modal>
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
