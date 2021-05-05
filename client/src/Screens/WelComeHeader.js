import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { devSignout, fetchDevProfile } from '../redux/action/DeveloperAction';
import { baseURL } from '../baseURL';

const WelComeHeader = () => {
  const dispatch = useDispatch();
  const signInDev = useSelector((state) => state.signInDev);
  const { isAuthenticated, devInfo } = signInDev;
  const [dpDropdown, setdpDropdown] = useState(false);

  const devProfile = useSelector((state) => state.devProfile);
  const { user } = devProfile;

  useEffect(() => {
    dispatch(fetchDevProfile(devInfo?._id));
  }, [dispatch, devInfo?._id]);
  const logoutHandler = () => {
    dispatch(devSignout());
  };

  const closeDD = () => {
    setdpDropdown(false);
  };

  return (
    <>
      <div className='relative z-40 p-3 px-4 sm:px-6 lg:px-8'>
        <nav
          className='relative flex items-center justify-between sm:h-10 lg:justify-start'
          aria-label='Global'
        >
          <div className='flex items-center flex-grow flex-shrink-0 lg:flex-grow-0'>
            <div className='flex items-center justify-between w-full md:w-auto'>
              <Link to='/' onClick={closeDD}>
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
              onClick={closeDD}
              to='/about'
              className='font-medium text-gray-500 hover:text-gray-900'
            >
              About Us
            </Link>
            <Link
              onClick={closeDD}
              to='/'
              className='font-medium text-gray-500 hover:text-gray-900'
            >
              Features
            </Link>
            <Link
              onClick={closeDD}
              to='/'
              className='font-medium text-gray-500 hover:text-gray-900'
            >
              FAQ
            </Link>
            {isAuthenticated ? (
              <div className='inline-block'>
                <div className=''>
                  <button
                    onClick={() => setdpDropdown((prev) => !prev)}
                    className='max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                    id='user-menu'
                    aria-haspopup='true'
                  >
                    <span className='sr-only'>Open user menu</span>
                    <img
                      className='h-8 w-8 rounded-full image_center'
                      src={baseURL + user?.dp}
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
                    >
                      <Link
                        onClick={closeDD}
                        to='/h/profile'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                        role='menuitem'
                      >
                        <i className='fas fa-user-circle mr-2'></i>Profile
                      </Link>
                      <Link
                        onClick={closeDD}
                        to='/h'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                        role='menuitem'
                      >
                        <i className='fas fa-tachometer-alt mr-2'></i>Dashboard
                      </Link>
                      <Link
                        onClick={closeDD}
                        to='/h/settings'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                        role='menuitem'
                      >
                        <i className='fas fa-cog mr-2'></i>Settings
                      </Link>

                      <p
                        onClick={logoutHandler}
                        className='block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                        role='menuitem'
                      >
                        <i className='fas fa-sign-out-alt mr-2'></i>Sign out
                      </p>
                    </div>
                  )}
                </Transition>
              </div>
            ) : (
              <Link
                to='/login'
                className='font-medium text-indigo-600 hover:text-indigo-500'
              >
                <i className='fas fa-sign-in-alt mr-2'></i>
                Log in
              </Link>
            )}
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
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelComeHeader;
