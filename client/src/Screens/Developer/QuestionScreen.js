import React, { useState, Fragment, useRef } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import QuestionContainer from '../../Container/QuestionContainer';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import SingleQuestionContainer from '../../Container/SingleQuestionContainer';

const QuestionScreen = () => {
  const cancelButtonRef = useRef();
  const { path } = useRouteMatch();

  const [askQestion, setAskQuestion] = useState(false);

  return (
    <div>
      <div className='h-12 items-center bg-white flex rounded shadow p-2 mt-2'>
        <div className='mx-auto h-full flex-shrink-0 flex items-center justify-center w-12 rounded-full bg-indigo-100 text-indigo-400 sm:mx-0 sm:h-10 sm:w-10'>
          <i className='fas fa-question'></i>
        </div>
        <div
          onClick={() => setAskQuestion(!askQestion)}
          className='flex items-center text-sm text-gray-400 rounded cursor-pointer ml-2 bg-gray-100 p-2 h-full w-full'
        >
          Ask a Question...
        </div>
      </div>
      <Transition.Root show={askQestion} as={Fragment}>
        <Dialog
          as='div'
          static
          className='fixed z-10 inset-0 overflow-y-auto'
          initialFocus={cancelButtonRef}
          open={askQestion}
          onClose={setAskQuestion}
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
                    <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-400 sm:mx-0 sm:h-10 sm:w-10'>
                      <i className='fas fa-question'></i>
                    </div>
                    <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                      <Dialog.Title
                        as='h3'
                        className='text-lg leading-6 font-medium text-gray-900'
                      >
                        Ask Question
                      </Dialog.Title>
                      <div className='mt-2'>{/* form submission */}</div>
                    </div>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                  <button
                    type='button'
                    className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm'
                    onClick={() => {
                      setAskQuestion(false);
                    }}
                  >
                    Post
                  </button>
                  <button
                    type='button'
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                    onClick={() => setAskQuestion(false)}
                    ref={cancelButtonRef}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <Switch>
        <Route exact path={path} component={QuestionContainer} />
        <Route path={`${path}/questions`} component={QuestionContainer} />
        <Route
          path={`${path}/:questionId`}
          component={SingleQuestionContainer}
        />
      </Switch>
    </div>
  );
};

export default QuestionScreen;
