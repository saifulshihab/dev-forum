import React from 'react';
import FindPeopleContainer from '../../Container/FindPeopleContainer';

const FindPeopleScreen = () => {
  return (
    <div className='grid grid-cols-4 h-full'>
      <div className='col-span-3'>
          <div className='bg-gray-100 px-2 shadow mb-2 h-10 flex items-center'>
              <p className='text-gray-500 text-lg font-semibold'><i className='fas fa-users mr-2'></i>Find People</p>
          </div>
          <div>
              <FindPeopleContainer />
          </div>
      </div>
    </div>
  );
};

export default FindPeopleScreen;
