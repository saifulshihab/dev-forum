import React from 'react';
import Project from '../Components/Project';
import { FreelanceProjectData } from '../Data';

const RProjectContainer = () => {
  return (
    <div>
      <div className='p-2 mb-1 bg-white flex items-center  text-gray-600'>
        <i className='fas fa-code mr-2'></i>
        <p className='text-lg font-semibold'>Browse Projects</p>
      </div>
      <div className='p-1'>
        {FreelanceProjectData?.map((project) => (
          <Project project={project} recruiter />
        ))}
      </div>
    </div>
  );
};

export default RProjectContainer;
