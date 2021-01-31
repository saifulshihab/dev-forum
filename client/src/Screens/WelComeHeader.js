import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Transition } from '@headlessui/react';

const WelComeHeader = () => {
  const [dpDropdown, setdpDropdown] = useState(false);
  return (
    <>
      <div className='relative z-40 p-3 px-4 sm:px-6 lg:px-8'>
        <nav
          className='relative flex items-center justify-between sm:h-10 lg:justify-start'
          aria-label='Global'
        >
          <div className='flex items-center flex-grow flex-shrink-0 lg:flex-grow-0'>
            <div className='flex items-center justify-between w-full md:w-auto'>
              <Link to='/'>
                <span className='sr-only'>DevForum</span>
                <span className='text-3xl text-3xl font-extrabold text-gray-900'>
                  DevForum
                </span>
              </Link>
              <div className='-mr-2 flex items-center md:hidden'>
                <button
                  type='button'
                  className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
                  id='main-menu'
                  aria-haspopup='true'
                >
                  <span className='sr-only'>Open main menu</span>

                  {/* <svg
                    class='h-6 w-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      strokeWidth='2'
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  </svg> */}
                </button>
              </div>
            </div>
          </div>
          <div className='hidden md:flex items-center ml-auto md:space-x-8'>
            <Link
              to='/about'
              className='font-medium text-gray-500 hover:text-gray-900'
            >
              About Us
            </Link>
            <Link
              to='/'
              className='font-medium text-gray-500 hover:text-gray-900'
            >
              Features
            </Link>
            <Link
              to='/'
              className='font-medium text-gray-500 hover:text-gray-900'
            >
              FAQ
            </Link>
            <Link
              to='/login'
              className='font-medium text-indigo-600 hover:text-indigo-500'
            >
              <i className='fas fa-sign-in-alt mr-2'></i>
              Log in
            </Link>
            <div className='inline-block'>
              <div className=''>
                <button
                  onClick={() => setdpDropdown(!dpDropdown)}
                  className='max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                  id='user-menu'
                  aria-haspopup='true'
                >
                  <span className='sr-only'>Open user menu</span>
                  <img
                    className='h-8 w-8 rounded-full'
                    src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                    alt=''
                  />
                </button>
                {dpDropdown && (
                  <div
                    onClick={() => setdpDropdown(false)}
                    className='fixed top-0 left-0 right-0 bottom-0 w-full'
                  ></div>
                )}
              </div>
              <Transition
                show={dpDropdown}
                enter='transition ease-out duration-100 transform'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='transition ease-in duration-75 transform'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                {(ref) => (
                  <div
                    ref={ref}
                    className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5'
                    role='menu'
                    aria-orientation='vertical'
                    aria-labelledby='user-menu'
                    area-aria-expanded={`${dpDropdown && true}`}
                  >
                    <Link
                      to='/h/profile'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      role='menuitem'
                    >
                      <i class='fas fa-user-circle mr-2'></i>Profile
                    </Link>

                    <Link
                      to='/'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      role='menuitem'
                    >
                      <i class='fas fa-cog mr-2'></i>Settings
                    </Link>

                    <Link
                      to='/'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      role='menuitem'
                    >
                      <i className='fas fa-sign-out-alt mr-2'></i>Sign out
                    </Link>
                  </div>
                )}
              </Transition>
            </div>
          </div>
        </nav>
      </div>

      <div className='absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'>
        <div className='rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden'>
          <div className='px-5 pt-4 flex items-center justify-between'>
            <div>
              <img
                className='h-8 w-auto'
                src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
                alt=''
              />
            </div>
            <div className='-mr-2'>
              <button
                type='button'
                className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
              >
                <span className='sr-only'>Close main menu</span>

                {/* <svg
                  class='h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg> */}
              </button>
            </div>
          </div>
          <div
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='main-menu'
          >
            <div className='px-2 pt-2 pb-3 space-y-1' role='none'>
              <Link
                to='/about'
                className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                role='menuitem'
              >
                About
              </Link>

              <Link
                to='/'
                className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                role='menuitem'
              >
                Features
              </Link>

              <Link
                to='/'
                className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                role='menuitem'
              >
                FAQ
              </Link>
            </div>
            <div role='none'>
              <Link
                to='/login'
                className='block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100'
                role='menuitem'
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelComeHeader;
