import React, { useEffect, useState } from 'react';
import { Formik, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Project from '../Components/Project';
import Alert from '../Components/Alert';
import MyTextField from '../Components/MyTextField';
import * as yup from 'yup';
import { sendProjectProposal } from '../redux/action/ProjectAction';

const SingleFreelanceProjectContainer = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState({});
  const dispatch = useDispatch();

  const proposalSend = useSelector((state) => state.proposalSend);
  const { loading, success, error } = proposalSend;

  const freelanceProjectsGet = useSelector(
    (state) => state.freelanceProjectsGet
  );
  const { projects } = freelanceProjectsGet;

  useEffect(() => {
    const pro = projects?.find(
      (project) => project?._id.toString() === projectId.toString()
    );
    setProject(pro);
  }, [projectId, projects]);

  const formValidationSchema = yup.object().shape({
    description: yup
      .string()
      .min(50, 'Minimum 50 character!')
      .max(10000, 'Maximum 10000 character!')
      .required('Description Required!'),
    duration: yup
      .number()
      .typeError('Number type!')
      .positive('Must be greater than 0')
      .required('Duration required!'),
    budget: yup
      .number()
      .typeError('Number type!')
      .positive('Must be greater than 0')
      .required('Recuired!'),
  });

  return (
    <>
      <div>
        <Project project={project} noRoute />
      </div>
      <div className='bg-white dark:bg-gray-700 rounded shadow p-2'>
        <div>
          <p className='text-md font-semibold text-gray-600 dark:text-gray-300 italic'>
            Send a Proposal
          </p>
        </div>
        <Formik
          initialValues={{ description: '', budget: '', duration: '' }}
          validationSchema={formValidationSchema}
          onSubmit={(data, { setSubmitting }) => {
            dispatch(sendProjectProposal(project?._id, data));
            setSubmitting(false);
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
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
                                appearance-none dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 rounded mt-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 sm:text-sm 
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
              <button
                type='submit'
                className={`text-white bg-indigo-600 ${
                  loading && 'bg-indigo-300'
                } focus:outline-none focus:bg-indigo-500 py-1.5 w-full rounded font-semibold mt-2`}
                disabled={isSubmitting}
              >
                {loading ? 'Sending...' : 'Send'}
              </button>
              {success ? (
                <Alert success msg={'Proposal sent!'} />
              ) : (
                error && <Alert fail msg={error} />
              )}
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default SingleFreelanceProjectContainer;
