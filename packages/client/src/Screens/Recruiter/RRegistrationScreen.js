import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';
import { Formik } from 'formik';
import * as yup from 'yup';
import MyTextField from '../../Components/MyTextField';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../../Components/Alert';
import Loader from '../../Components/Loader';
import { recSignup } from '../../redux/action/RecruiterAction';

const RRegistrationScreen = ({ history }) => {
  const dispatch = useDispatch();
  const signUpRec = useSelector((state) => state.signUpRec);
  const { loading, success, error } = signUpRec;

  const signInRec = useSelector((state) => state.signInRec);
  const { isAuthenticated } = signInRec;

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/r');
    }
    return () => {};
  }, [history, isAuthenticated]);

  const fieldValidationSchema = yup.object({
    fullname: yup
      .string()
      .max(20, 'Must be 20 charecters or less!')
      .min(4, 'At least 4 charecter!')
      .required('Required!'),
    email: yup.string().email().required('Required!'),
    password: yup
      .string()
      .min(6, 'At least 6 charecter!')
      .required('Required!'),
    c_password: yup
      .string()
      .min(6, 'At least 6 charecter!')
      .required('Required!'),
  });

  return (
    <div className='grid mt-10 place-items-center'>
      <div className='w-11/12 p-4 bg-gray-50 dark:bg-gray-700 sm:w-3/5 md:w-2/5 lg:w-1/3'>
        <div className='mt-3'>
          <img className='mx-auto h-12 w-auto' src={logo} alt='Workflow' />
          <h2 className='mt-4 text-center dark:text-gray-200 text-3xl font-extrabold text-gray-900'>
            Create Account
          </h2>
        </div>
        <Formik
          initialValues={{
            fullname: '',
            email: '',
            password: '',
            c_password: '',
          }}
          validationSchema={fieldValidationSchema}
          onSubmit={(data, { setSubmitting }) => {
            dispatch(recSignup(data));
            setSubmitting(false);
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form className='mt-6' onSubmit={handleSubmit}>
              <MyTextField
                id='fname'
                type='text'
                name='fullname'
                label='Full name'
                placeholder='Your full name'
              />
              <MyTextField
                id='email'
                type='email'
                name='email'
                label='Email'
                placeholder='john.doe@company.com'
              />
              <MyTextField
                id='password'
                type='password'
                name='password'
                label='Password'
                placeholder='********'
              />

              <MyTextField
                id='password-confirm'
                type='password'
                name='c_password'
                placeholder='********'
                label='Confirm password'
              />
              <button
                disabled={isSubmitting}
                type='submit'
                className='w-full rounded py-3 mt-6 font-medium tracking-widest text-white uppercase text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none'
              >
                Sign up
              </button>
              <Link to='/re-login'>
                <p className='flex justify-between inline-block mt-4 text-xs text-indigo-600 hover:text-indigo-500 cursor-pointer'>
                  Already registered?
                </p>
              </Link>
            </form>
          )}
        </Formik>
        {loading ? (
          <Loader />
        ) : success ? (
          <Alert success msg={'Registration successfull!'} />
        ) : (
          error && <Alert fail msg={error} />
        )}
      </div>
    </div>
  );
};

export default RRegistrationScreen;
