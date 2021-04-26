import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import SmallLoader from '../../Components/SmallLoader';
import { useDispatch, useSelector } from 'react-redux';
import {
  devSignout,
  deleteDevAccount,
} from '../../redux/action/DeveloperAction';

const SettingsScreen = () => {
  const cancelButtonRef = useRef();

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
    dispatch(deleteDevAccount(devInfo._id));
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
            className='h-10 rounded px-4 bg-red-500 outline-none focus:outline-none text-sm font-semibold text-white'
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
      <Transition.Root show={modalOpen} as={Fragment}>
        <Dialog
          as='div'
          static
          className='fixed z-10 inset-0 overflow-y-auto'
          initialFocus={cancelButtonRef}
          open={modalOpen}
          onClose={setModalOpen}
        >
          <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
                <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                  <div className='sm:flex sm:items-start'>
                    <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                      <i className='fas text-red-600 fa-trash-alt'></i>
                    </div>
                    <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                      <Dialog.Title
                        as='h3'
                        className='text-lg leading-6 font-medium text-gray-900'
                      >
                        Deactivate account
                      </Dialog.Title>
                      <div className='mt-2'>
                        <p className='text-sm text-gray-500'>
                          Are you sure you want to deactivate your account? All
                          of your data will be permanently removed. This action
                          cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                  <button
                    onClick={profileDeleteHandler}
                    type='button'
                    className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
                  >
                    Confirm delete
                  </button>
                  <button
                    onClick={() => setModalOpen(false)}
                    type='button'
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default SettingsScreen;
