import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import logo from '../logo.svg';
import MyTextField from '../Components/MyTextField';
import * as yup from 'yup';
import { devSignin } from '../redux/action/DeveloperAction';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../Components/Alert';
import { recSignout } from '../redux/action/RecruiterAction';
import Spinner from '../Components/Spinner';

const LoginPage = ({ history }) => {
  const dispatch = useDispatch();
  const signInDev = useSelector((state) => state.signInDev);
  const { loading, isAuthenticated, error } = signInDev;

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/h');
      dispatch(recSignout())
    }
    return () => {};
  }, [history, isAuthenticated, dispatch]);

  const fieldValidationSchema = yup.object({
    username: yup.string().required('Required!'),
    password: yup.string().required('Required!'),
  });

  return (
    <>
      <div className='flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full bg-gray-50 p-6 space-y-8'>
          <div>
            <img className='mx-auto h-12 w-auto' src={logo} alt='Workflow' />
            <h2 className='mt-4 text-center text-3xl font-extrabold text-gray-900'>
              Sign in to your account
            </h2>
            <p className='mt-2 text-center text-sm text-gray-600'>
              Or
              <Link
                to='/registration'
                className='ml-1 font-medium text-indigo-600 hover:text-indigo-500'
              >
                Not registered yet?
              </Link>
            </p>
            <p className='mt-2 text-center text-sm text-gray-600'>
              Or
              <Link
                to='/re-login'
                className='ml-1 font-medium text-indigo-600 hover:text-indigo-500'
              >
                Recruiter Login
              </Link>
            </p>
          </div>
          <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={(data, { setSubmitting }) => {
              dispatch(devSignin(data));
              setSubmitting(false);
            }}
            validationSchema={fieldValidationSchema}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
                <input type='hidden' name='remember' value='true' />
                <div className='rounded-md -space-y-px'>
                  <MyTextField
                    id='username'
                    name='username'
                    type='text'
                    placeholder='Email or username'
                  />

                  <MyTextField
                    id='password'
                    name='password'
                    type='password'
                    placeholder='Password'
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <input
                      id='remember_me'
                      name='remember_me'
                      type='checkbox'
                      className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                    />
                    <label
                      htmlFor='remember_me'
                      className='ml-2 block text-sm text-gray-900'
                    >
                      Remember me
                    </label>
                  </div>

                  <div className='text-sm'>
                    <Link
                      to='/forgot-password'
                      className='font-medium text-indigo-600 hover:text-indigo-500'
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    disabled={isSubmitting}
                    type='submit'
                    className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                      isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600'
                    }  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    {loading && (
                      <Spinner />
                    )}
                    {loading ? 'Signing in...' : 'Sign in'}
                  </button>
                </div>
              </form>
            )}
          </Formik>
          {error && <Alert fail msg={error} />}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
