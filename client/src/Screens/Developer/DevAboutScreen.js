import React from 'react';

const DevAboutScreen = ({ profile }) => {
  return (
    <div className='w-full'>
      {profile.experiences?.length > 0 && (
        <div className='mb-3'>
          <p className='font-semibold text-2xl p-1 mb-2 border-b'>
            Experiences
          </p>
          {profile.experiences.map((d, idx) => (
            <div key={idx} className='text-gray-600 mb-3'>
              <p className='text-lg font-semibold'>{d.role}</p>
              <p className='text-md font-semibold'>{d.company}</p>
              <p className='text-gray-400 text-sm italic'>
                {d.from} - {d.present ? 'Present' : d.to && d.to}
              </p>
              <p className='text-sm'>{d.desc}</p>
            </div>
          ))}
        </div>
      )}
      {profile.education?.length > 0 && (
        <div className='mb-3'>
          <p className='font-semibold text-2xl p-1 mb-2 border-b'>Education</p>
          {profile.education.map((d, idx) => (
            <div key={idx} className='text-gray-600 mb-3'>
              <p className='text-lg font-semibold inline-block mr-2'>
                {d.institute}
              </p>
              (<span className='text-md font-semibold'>{d.type}</span>)
              <p className='text-gray-400 text-sm italic'>
                {d.from} - {d.present ? 'Present' : d.to && d.to}
              </p>
              <p className='text-sm'>{d.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DevAboutScreen;
