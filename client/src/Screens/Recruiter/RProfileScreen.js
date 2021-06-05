import { Formik } from 'formik';
import React, { useEffect } from 'react';
import MyTextField from '../../Components/MyTextField';
import Alert from '../../Components/Alert';
import Spinner from '../../Components/Spinner';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  editRecruiterProfile,
  getRecruiterProfile,
} from '../../redux/action/RecruiterAction';

const RProfileScreen = () => {
  const dispatch = useDispatch();

  const recruiterProfileGet = useSelector((state) => state.recruiterProfileGet);
  const { loading: getLoading, user, error: getError } = recruiterProfileGet;

  const recruiterProfileEdit = useSelector(
    (state) => state.recruiterProfileEdit
  );
  const {
    loading: editLoading,
    success: editSuccess,
    error: editError,
  } = recruiterProfileEdit;

  useEffect(() => {
    // getting profile information
    dispatch(getRecruiterProfile());
  }, [dispatch]);

  const formValidationSchema = yup.object().shape({
    fullname: yup
      .string()
      .min(3, 'Minimum 3 character!')
      .max(20, 'Maximum 20 character!')
      .required('Required!'),
    email: yup.string().email().required('Required!'),
  });

  return (
    <div className='p-2 rounded text-gray-500'>
      <div className='w-full rounded bg-white dark:bg-gray-700 max-w-md w-full bg-gray-50 p-6 space-y-8'>
        <div>
          <p className='font-semibold text-xl border-b dark:border-gray-600 dark:text-gray-200 pb-1 mb-1'>
            <i className='fas fa-user mr-2'></i>Profile Information{' '}
            {getLoading && 'Loading...'}
          </p>
        </div>
        {!getLoading && (
          <Formik
            initialValues={{
              fullname: user?.fullname,
              email: user?.email,
            }}
            validationSchema={formValidationSchema}
            onSubmit={(data, { setSubmitting }) => {
              dispatch(editRecruiterProfile(data));
              setSubmitting(false);
            }}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <MyTextField
                  label='Full Name'
                  name='fullname'
                  type='text'
                  placeholder='Full name'
                />
                <MyTextField
                  label='Email'
                  name='email'
                  type='email'
                  placeholder='Email'
                />

                <button
                  disabled={isSubmitting}
                  className='p-1 px-2 bg-blue-500 hover:bg-blue-600 text-white mt-5 font-semibold focus:outline-none rounded'
                >
                  {editLoading ? <Spinner small /> : 'Update'}
                </button>
              </form>
            )}
          </Formik>
        )}
        <div className='mt-2'>
          {getError && <Alert fail msg={getError} />}
          {editError && <Alert fail msg={editError} />}
          {editSuccess && <Alert success msg={'Profile Updated!'} />}
        </div>
      </div>
    </div>
  );
};

export default RProfileScreen;
