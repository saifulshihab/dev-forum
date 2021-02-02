import React, { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import SmallLoader from '../../Components/SmallLoader';
import { useDispatch, useSelector } from 'react-redux';
import {
  devSignout,
  deleteDevAccount,
} from '../../redux/action/DeveloperAction';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const devProfileDelete = useSelector((state) => state.devProfileDelete);
  const { loading, success } = devProfileDelete;
  const signInDev = useSelector((state) => state.signInDev);
  const { devInfo } = signInDev;
  useEffect(() => {
    if (success) {
      console.log('user deleted');
      dispatch(devSignout());
    }
    return () => {};
  }, [dispatch, success]);

  const profileDeleteHandler = () => {
    setModalOpen(false);
    dispatch(deleteDevAccount(devInfo.username));
  };
  return (
    <div className='p-1'>
      <div className='account_wrapper mb-2 bg-white w-full h-12 px-3 flex items-center'>
        <div className=''>
          <p className='text-lg font-semibold'>Account settings</p>
        </div>
        <div className='ml-auto'></div>
      </div>
      <div className='privacy_wrapper mb-2 bg-white w-full h-12 px-3 flex items-center'>
        <div className=''>
          <p className='text-lg font-semibold'>Privacy settings</p>
        </div>
        <div className='ml-auto'></div>
      </div>
      <div className='delete_wrapper mb-2 bg-white w-full h-12 px-3 flex items-center'>
        <div className=''>
          <p className='text-lg font-semibold'>Permenantly Delete Account?</p>
        </div>
        <div className='ml-auto'>
          <button
            onClick={() => setModalOpen(true)}
            className='h-10 px-4 bg-red-500 outline-none focus:outline-none text-sm font-semibold text-white'
          >
            {loading ? (
              <SmallLoader color='text-white' />
            ) : (
              <i className='fas fa-trash-alt mr-2'></i>
            )}
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      <Transition
        show={modalOpen}
        enter='ease-out duration-300'
        enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
        enterTo='opacity-100 translate-y-0 sm:scale-100'
        leave='ease-in duration-200'
        leaveFrom='opacity-100 translate-y-0 sm:scale-100'
        leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
      >
        {(ref) => (
          <div
            ref={ref}
            class='fixed inset-0 transition-opacity'
            aria-hidden='true'
          >
            <div class='absolute inset-0 bg-gray-500 opacity-75'></div>
          </div>
        )}
      </Transition>

      <Transition
        show={modalOpen}
        enter='ease-out duration-300'
        enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
        enterTo='opacity-100 translate-y-0 sm:scale-100'
        leave='ease-in duration-200'
        leaveFrom='opacity-100 translate-y-0 sm:scale-100'
        leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
      >
        {(ref) => (
          <div
            ref={ref}
            class='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
            role='dialog'
            aria-modal='true'
            aria-labelledby='modal-headline'
          >
            <div class='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
              <div class='sm:flex sm:items-start'>
                <div class='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                  <svg
                    class='h-6 w-6 text-red-600'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                    />
                  </svg>
                </div>
                <div class='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                  <h3
                    class='text-lg leading-6 font-medium text-gray-900'
                    id='modal-headline'
                  >
                    Deactivate account
                  </h3>
                  <div class='mt-2'>
                    <p class='text-sm text-gray-500'>
                      Are you sure you want to deactivate your account? All of
                      your data will be permanently removed. This action cannot
                      be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
              <button
                onClick={profileDeleteHandler}
                type='button'
                class='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
              >
                Confirm delete
              </button>
              <button
                onClick={() => setModalOpen(false)}
                type='button'
                class='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Transition>
    </div>
  );
};

export default SettingsScreen;
