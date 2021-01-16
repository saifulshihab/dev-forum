import React from 'react';

const FProjectDetails = ({ project }) => {
  return (
    <div className='w-full text-gray-600 mb-2 rounded shadow p-3 bg-white '>
      <div className='h-8 hover:text-indigo-600 cursor-pointer text-xl font-semibold'>
        {project.title}
      </div>
      <div className='my-2 w-full overflow-hidden text-sm overflow-ellipsis'>
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
  );
};

export default FProjectDetails;
