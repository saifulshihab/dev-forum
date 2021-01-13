import React from 'react';
import logo from '../logo.svg';

const ForgotPassword = () => {
  return (
    <>
      <div class='flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div class='max-w-md w-full bg-gray-50 p-6 space-y-8'>
          <div>
            <img class='mx-auto h-12 w-auto' src={logo} alt='Workflow' />
            <h2 class='mt-4 text-center text-3xl font-extrabold text-gray-900'>
              Recover Password
            </h2>
          </div>
          <form class='mt-8 space-y-6' action='#' method='POST'>
            <input type='hidden' name='remember' value='true' />
            <div class='rounded-md shadow-sm -space-y-px'>
              <div>
                <label for='email-address' class='sr-only'>
                  Email Address
                </label>
                <input
                  id='email-address'
                  name='email'
                  type='email'
                  autocomplete='email'
                  required
                  class='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Enter your registered email addess'
                />
              </div>
            </div>
            <div>
              <button
                type='submit'
                class='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Recover
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;