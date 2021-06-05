import React, { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const Modal = ({
  modalOpen,
  setModalOpen,
  title,
  titleIcon,
  children,
  footerYesButton,
  yesBtnAction,
  large,
}) => {
  const cancelButtonRef = useRef();

  return (
    <div>
      <Transition.Root style={{ zIndex: 1000 }} show={modalOpen} as={Fragment}>
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
              <div
                className={`inline-block align-bottom bg-white dark:bg-gray-700 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:${
                  large ? 'max-w-2xl' : 'max-w-lg'
                } sm:w-full`}
              >
                <div className='bg-white dark:bg-gray-700 px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                  <div className='sm:flex sm:items-start'>
                    {titleIcon && (
                      <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 dark:bg-gray-800 text-indigo-400 sm:mx-0 sm:h-10 sm:w-10'>
                        <i className={titleIcon}></i>
                      </div>
                    )}
                    <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                      <Dialog.Title
                        as='h3'
                        className='text-lg leading-6 font-medium text-gray-600 dark:text-gray-200'
                      >
                        {title && title}
                      </Dialog.Title>
                    </div>
                  </div>
                  <div className='mt-2 w-full'>
                    {/* modal body here */}
                    {children}
                  </div>
                </div>
                <div className='bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                  <button
                    type='button'
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:bg-gray-600 dark:text-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none dark:border-gray-600 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                    onClick={() => setModalOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Close
                  </button>
                  {footerYesButton && (
                    <button
                      type='button'
                      className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none dark:border-gray-600 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                      onClick={yesBtnAction}
                      ref={cancelButtonRef}
                    >
                      Yes
                    </button>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default Modal;
