import React from 'react';
import { baseURL } from '../baseURL';

const Proposal = ({ proposal }) => {
  return (
    <div className='bg-white rounded shadow p-2 text-gray-500'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <div className='w-8 h-8 mr-1.5'>
            <img
              className='rounded-full w-full h-full'
              src={baseURL + proposal?.user?.dp}
              alt='Developer DP'
            />
          </div>
          <div className='h-8'>
            <p className='text-sm font-semibold'>{proposal?.user?.full_name}</p>
            <p className='text-xs' style={{marginTop: -3}}>{proposal?.user?.bio}</p>
          </div>
        </div>
        <div className='italic font-semibold'>
          <div>
            <p>${proposal?.budget}</p>
            <p className='text-xs'>{proposal?.duration} days</p>
          </div>
        </div>
      </div>
      <div className='mt-1 text-justify text-sm'>{proposal?.description}</div>
    </div>
  );
};

export default Proposal;
