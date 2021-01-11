import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';

const RegPage = () => {
  return (
    <div class='grid mt-10 place-items-center'>
      <div class='w-11/12 p-4 bg-gray-50 sm:w-3/5 md:w-2/5 lg:w-1/3'>
        <div className="mt-3">
          <img
            class='mx-auto h-12 w-auto'
            src={logo}
            alt='Workflow'
          />
          <h2 class='mt-4 text-center text-3xl font-extrabold text-gray-900'>
            Create Account
          </h2>
        </div>
        <form class='mt-6'>
          <label
            for='f_name'
            class='block mt-2 text-xs font-semibold text-gray-600 uppercase'
          >
            Full Name
          </label>
          <input
            id='f_name'
            type='text'
            name='f_name'
            placeholder='Your full name'
            autocomplete='f_name'
            class='appearance-none rounded-none mt-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 sm:text-sm'
            required
          />
          <label
            for='email'
            class='block mt-2 text-xs font-semibold text-gray-600 uppercase'
          >
            E-mail
          </label>
          <input
            id='email'
            type='email'
            name='email'
            placeholder='john.doe@company.com'
            autocomplete='email'
            class='appearance-none rounded-none mt-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 sm:text-sm'
            required
          />
          <label
            for='password'
            class='block mt-2 text-xs font-semibold text-gray-600 uppercase'
          >
            Password
          </label>
          <input
            id='password'
            type='password'
            name='password'
            placeholder='********'
            autocomplete='new-password'
            class='appearance-none rounded-none mt-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 sm:text-sm'
            required
          />
          <label
            for='password-confirm'
            class='block mt-2 text-xs font-semibold text-gray-600 uppercase'
          >
            Confirm password
          </label>
          <input
            id='password-confirm'
            type='password'
            name='password-confirm'
            placeholder='********'
            autocomplete='new-password'
            class='appearance-none rounded-none mt-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 sm:text-sm'
            required
          />
          <button
            type='submit'
            class='w-full py-3 mt-6 font-medium tracking-widest text-white uppercase text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none'
          >
            Sign up
          </button>
          <Link to='/login'>
            <p class='flex justify-between inline-block mt-4 text-xs text-indigo-600 hover:text-indigo-500 cursor-pointer'>
              Already registered?
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegPage;
