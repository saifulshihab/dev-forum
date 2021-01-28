import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const Job = ({ job }) => {
  const { url } = useRouteMatch();
  return (
    <div className='w-full h-42 bg-white p-2 px-4 mb-2 text-gray-600 rounded shadow'>
      <Link to={`${url}/${job.id}`}>
        <p className='w-full text-xl hover font-semibold hover:text-indigo-600 cursor-pointer'>
          {job.role}
        </p>
      </Link>
      <p className='text-md font-semibold'>Company: {job.company}</p>
      <p className='text-md'>Office Location: {job.location}</p>
      <p className='text-md'>Job Type: {job.job_type}</p>
      <p className='text-md'>Salary: {job.salary}</p>
      <div className='flex items-center text-gray-400 text-sm'>
        <p className='italic'>{job.createdAt}</p>
      </div>
    </div>
  );
};

export default Job;
