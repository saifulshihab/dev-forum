import React from 'react';

const Project = ({ project, recruiter }) => {
  return (
    <div className='bg-white p-3 text-gray-500 rounded shadow mb-2 text-justify'>
      <div className='w-full h-auto'>
        <p className='text-lg cursor-pointer hover:text-indigo-500 font-semibold'>
          {project?.title}
        </p>
      </div>
      <div className='w-full text-sm  mt-2 h-auto'>
        <p>{project?.description}</p>
      </div>
      <div className='text-xs flex mt-2 items-center justify-between italic'>
        <span>
          <i className='far fa-clock mr-1'></i>
          <strong>Duration:</strong> {project?.duration} days
        </span>
        <span>
          <i className='fas fa-money-check-alt mr-1'></i>
          <strong>Budget:</strong> ${project?.budget}
        </span>
      </div>
      <div className='mt-1 text-xs '>
        <div className='flex items-center'>
          <div className='mr-1'>
            <i className='fas fa-code mr-1'></i>
            <strong>Technologies:</strong>
          </div>
          <div className={`flex mt-2 items-center text-xs`}>
            {project?.technologies?.map((tech, idx) => (
              <span
                key={idx}
                className='bg-gray-200 mr-1 mb-2 text-xs text-gray-500 py-.5 px-1 rounded mb-1'
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className='mt-1 text-xs text-center cursor-pointer flex items-center'>
        {recruiter && (
          <div className='w-1/2  hover:text-indigo-600'>
            <span>
              <i className='mr-1 far fa-edit'></i>Edit
            </span>
          </div>
        )}
        {recruiter && (
          <div className='w-1/2  hover:text-indigo-600'>
            <span>
              <i className='mr-1 far fa-trash-alt'></i> Delete
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Project;
