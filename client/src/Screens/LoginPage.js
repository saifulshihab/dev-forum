import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';

const LoginPage = () => {
  return (
    <>
      <div class='flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div class='max-w-md w-full bg-gray-50 p-6 space-y-8'>
          <div>
            <img class='mx-auto h-12 w-auto' src={logo} alt='Workflow' />
            <h2 class='mt-4 text-center text-3xl font-extrabold text-gray-900'>
              Sign in to your account
            </h2>
            <p class='mt-2 text-center text-sm text-gray-600'>
              Or
              <Link
                to='/registration'
                class='ml-1 font-medium text-indigo-600 hover:text-indigo-500'
              >
                Not registered yet?
              </Link>
            </p>
          </div>
          <form class='mt-8 space-y-6' action='#' method='POST'>
            <input type='hidden' name='remember' value='true' />
            <div class='rounded-md shadow-sm -space-y-px'>
              <div>
                <label for='email-address' class='sr-only'>
                  Email or username
                </label>
                <input
                  id='email-address'
                  name='email'
                  type='email'
                  autocomplete='email'
                  required
                  class='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Email or username'
                />
              </div>
              <div>
                <label for='password' class='sr-only'>
                  Password
                </label>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autocomplete='current-password'
                  required
                  class='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Password'
                />
              </div>
            </div>

            <div class='flex items-center justify-between'>
              <div class='flex items-center'>
                <input
                  id='remember_me'
                  name='remember_me'
                  type='checkbox'
                  class='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                />
                <label
                  for='remember_me'
                  class='ml-2 block text-sm text-gray-900'
                >
                  Remember me
                </label>
              </div>

              <div class='text-sm'>
                <Link
                  to='/forgot-password'
                  class='font-medium text-indigo-600 hover:text-indigo-500'
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type='submit'
                class='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                {3 === 3 && (
                  <svg
                    class='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      class='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      stroke-width='4'
                    ></circle>
                    <path
                      class='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                )}
                <Link to='/h'>{3 == 3 ? 'Signing in...' : 'Sign in'}</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
