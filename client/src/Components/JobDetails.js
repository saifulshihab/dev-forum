import React from 'react';

const JobDetails = ({ job }) => {
  return (
    <div className='w-full p-3 bg-white rounded text-gray-700'>
      <p className='mb-2 text-2xl font-bold'>{job.role}</p>
      <p className='text-lg font-semibold'>Company: {job.company}</p>
      <div className='italic'>
        <p>Location: {job.location}</p>
        <p>Job Type: {job.job_type}</p>
        <p>Salary: {job.salary} (BDT)</p>
        <p>Posted {job.createdAt} ago</p>
      </div>
      <div className='mt-2'>
        <h1 className='text-xl font-bold mb-2'>Job Description</h1>
        <p className='text-justify'>{job.description}</p>

        <button className='mb-5 w-full mt-2 py-1.5 bg-indigo-500 text-white hover:bg-indigo-600  border border-indigo-700 focus:outline-none rounded'>
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
