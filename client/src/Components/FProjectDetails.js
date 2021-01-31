import React from 'react';

const FProjectDetails = ({ project }) => {
  return (
    <>
      <div className='w-full text-gray-600 mb-2 rounded shadow p-3 bg-white '>
        <div className='h-8 hover:text-indigo-600 cursor-pointer text-xl font-semibold'>
          {project.title}
        </div>
        <div className='my-2 w-full overflow-hidden text-sm text-justify overflow-ellipsis'>
          {project.description}
        </div>
        <div className='w-full flex text-sm'>
          <div className='mr-4 flex items-center text-gray-500'>
            <span className='mr-2 font-semibold'>Skills:</span>
            <div className='flex items-center'>
              {project.languages.map((ln) => (
                <span className='mr-1'>{`${ln}, `}</span>
              ))}
            </div>
          </div>
          <div className='mr-4 flex items-center text-gray-500'>
            <span className='mr-2 font-semibold'>Budget: </span>
            <div className='flex items-center'>৳ {project.budget}</div>
          </div>
          <div className='mr-4 flex items-center text-gray-500'>
            <span className='mr-2 font-semibold'>Duration:</span>
            <div className='flex items-center'>{project.duration} days</div>
          </div>
        </div>
      </div>
      <div className='mt-3 text-gray-600 mb-2 rounded shadow p-3 bg-white'>
        <div className=''>
          <form>   
          <label
              for='_proposal_input'
              class='block mt-2 text-xs font-semibold text-gray-600 uppercase'
            >
              Send a proposal to client
            </label>
            <textarea
            id='_proposal_input'
            placeholder='Write your proposal...'
            rows='6'
            class='appearance-none rounded-none mt-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 sm:text-sm'></textarea>
            <label
              for='budget'
              class='block mt-2 text-xs font-semibold text-gray-600 uppercase'
            >
              Project milestone
            </label>
            <input
              id='budget'
              type='text'
              name='budget'
              placeholder='Project milestone (eg. 30k)'
              autocomplete='budget'
              class='appearance-none rounded-none mt-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 sm:text-sm'
              required
            />
            <button
                type='submit'
                className='group mt-2 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                {3 === 33 && (
                  <svg
                    className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                )}
                
                  {3 == 23 ? 'Processing...' : 'Bid now'}
                
              </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FProjectDetails;
