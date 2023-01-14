import React from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import MyTextField from '../Components/MyTextField';
import * as yup from 'yup';
import { resetPasswordFromLink } from '../redux/action/DeveloperAction';
import Spinner from '../Components/Spinner';
import Alert from '../Components/Alert';

const RecoverPassword = () => {
  const dispatch = useDispatch();

  const { token } = useParams();

  const devPasswordResetFL = useSelector((state) => state.devPasswordResetFL);
  const { loading, success, error } = devPasswordResetFL;

  const formValidationSchema = yup.object().shape({
    newPass: yup
      .string()
      .min(6, 'Minimum 6 character!')
      .max(10, 'Maximum 10 character!')
      .required('Required!'),
    conPass: yup
      .string()
      .min(6, 'Minimum 6 character!')
      .max(10, 'Maximum 10 character!')
      .required('Required!'),
  });

  return (
    <div className='flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full bg-gray-50 p-6 space-y-8'>
        <p className='text-gray-600 text-xl font-semibold'>Reset Password</p>
        <Formik
          initialValues={{
            newPass: '',
            conPass: '',
          }}
          validationSchema={formValidationSchema}
          onSubmit={(data, { setSubmitting }) => {
            dispatch(
              resetPasswordFromLink(token, data?.newPass, data?.conPass)
            );
            setSubmitting(false);
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <MyTextField
                label='New Password'
                name='newPass'
                type='password'
                placeholder='Enter new password'
              />
              <MyTextField
                label='Retype Password'
                name='conPass'
                type='password'
                placeholder='Retype new password'
              />
              <button
                type='submit'
                className={`text-white bg-indigo-600 ${
                  'loading' && 'bg-indigo-300'
                } focus:outline-none focus:bg-indigo-500 py-1.5 w-full rounded font-semibold mt-2`}
                disabled={isSubmitting}
              >
                {loading ? <Spinner small /> : 'Reset'}
              </button>
            </form>
          )}
        </Formik>
        <div className='mt-2'>
          {error && <Alert fail msg={error} />}
          {success && <Alert success msg={'Password reset successfully!'} />}
        </div>
      </div>
    </div>
  );
};

export default RecoverPassword;
