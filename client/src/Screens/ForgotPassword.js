import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../Components/Alert';
import Spinner from '../Components/Spinner';
import logo from '../logo.svg';
import { getResetPasswordLinkDev } from '../redux/action/DeveloperAction';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const resetLinkDevGet = useSelector((state) => state.resetLinkDevGet);
  const { loading, success, error, message } = resetLinkDevGet;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getResetPasswordLinkDev(email));
  };

  return (
    <>
      <div className='flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full bg-gray-50 p-6 space-y-8'>
          <div>
            <img className='mx-auto h-12 w-auto' src={logo} alt='Workflow' />
            <h2 className='mt-4 text-center text-3xl font-extrabold text-gray-900'>
              Recover Password
            </h2>
          </div>
          <form className='mt-8 space-y-6' onSubmit={submitHandler}>
            <input type='hidden' name='remember' value='true' />
            <div className='rounded-md shadow-sm -space-y-px'>
              <div>
                <label htmlFor='email-address' className='sr-only'>
                  Email Address
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id='email-address'
                  name='email'
                  type='email'
                  required
                  className='appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Enter your registered email addess'
                />
              </div>
            </div>
            <div>
              <button
                type='submit'
                disabled={loading}
                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                {loading ? <Spinner small /> : 'Get Reset Link'}
              </button>
            </div>
          </form>
          <div className='mt-1'>
            {error && <Alert fail msg={error} />}
            {success && <Alert success msg={message} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
