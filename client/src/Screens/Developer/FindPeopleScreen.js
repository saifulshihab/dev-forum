import React from 'react';
import FindPeopleContainer from '../../Container/FindPeopleContainer';

const FindPeopleScreen = () => {
  return (
    <div className='grid grid-cols-4 h-full'>
      <div className='col-span-3'>
        <div className='mb-2 text-xl text-gray-500 bg-gray-100 w-full font-bold p-3'>
          Find People
        </div>
        <div>
          <FindPeopleContainer />
        </div>
      </div>
    </div>
  );
};

export default FindPeopleScreen;
