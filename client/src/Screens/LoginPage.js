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
      dispatch(recSignout());
    }
    return () => {};
  }, [history, isAuthenticated, dispatch]);

  const fieldValidationSchema = yup.object({
    username: yup.string().required('Required!'),
    password: yup.string().required('Required!'),
  });

  // const googleLoginHandler = () => {
  //   window.location.href = `${baseURL}/auth/google`;
  // };

  return (
    <>
      <div className='flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full bg-gray-50 dark:bg-gray-700 p-6 space-y-6'>
          <div>
            <img className='mx-auto h-12 w-auto' src={logo} alt='Workflow' />
            <h2 className='mt-4 text-center text-3xl font-extrabold text-gray- dark:text-gray-200'>
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
                    placeholder='Enter username'
                  />

                  <MyTextField
                    id='password'
                    name='password'
                    type='password'
                    placeholder='Enter password'
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <input
                      id='remember_me'
                      name='remember_me'
                      type='checkbox'
                      className='h-4 w-4 dark:bg-gray-800 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                    />
                    <label
                      htmlFor='remember_me'
                      className='ml-2 block text-sm text-gray-900 dark:text-gray-300'
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
                    }  hover:bg-indigo-700 focus:outline-none`}
                  >
                    {loading && <Spinner />}
                    {loading ? 'Signing in...' : 'Sign in'}
                  </button>
                </div>
              </form>
            )}
          </Formik>
          {/* <div className='flex flex-col space-y-2'>
            <button
              onClick={googleLoginHandler}
              type='button'
              className={` w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white
            bg-red-500 hover:bg-red-700 focus:outline-none  `}
            >
              <img
                alt='logo'
                src='data:image/png;base64,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'
                width={16}
                className='rounded-full mr-2'
                height={16}
              />
              Sign in with Google
            </button>
            <button
              type='button'
              className={` w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white
            bg-gray-700 hover:bg-gray-600 focus:outline-none  `}
            >
              <img
                alt='logo'
                src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
                width={16}
                height={16}
                className='rounded-full mr-2'
              />
              Sign in with Github
            </button>
            <button
              type='button'
              className={` w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white
            bg-blue-400 hover:bg-blue-500 focus:outline-none  `}
            >
              <img
                alt='logo'
                src='data:image/png;base64,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'
                width={16}
                height={16}
                className='rounded-full mr-2'
              />
              Sign in with Twitter
            </button>
          </div> */}
          {error && <Alert fail msg={error} />}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
