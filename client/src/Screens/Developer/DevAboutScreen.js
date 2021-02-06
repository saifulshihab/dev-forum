import React from 'react';

const DevAboutScreen = ({ profile, loading }) => {
  return (
    <div className='w-full'>
      {profile?.topSkills?.length > 0 ? (
        <div className='mb-3'>
          <p className='font-semibold text-2xl p-1 mb-2 border-b'>Skills</p>
          <div className='mb-.5'>
            <p className='mb-2 text-sm text-gray-500 font-bold'>Top Skills</p>
            <div className='flex items-center flex-wrap'>
              <>
                {profile.topSkills.map((d, idx) => (
                  <div
                    key={idx}
                    className='bg-gray-200 mr-2 mb-2 text-sm text-gray-500 font-semibold py-1 px-5 rounded-full mb-3'
                  >
                    {d}
                  </div>
                ))}
              </>
            </div>
          </div>
          {profile?.otherSkills?.length > 0 ? (
            <div className='mb-1'>
              <p className='mb-2 text-sm text-gray-500 font-bold'>
                Other Skills
              </p>
              <div className='flex items-center flex-wrap'>
                <>
                  {profile.otherSkills.map((d, idx) => (
                    <div
                      key={idx}
                      className='bg-gray-200 mr-2 mb-2 text-sm text-gray-500 font-semibold py-1 px-5 rounded-full mb-3'
                    >
                      {d}
                    </div>
                  ))}
                </>
              </div>
            </div>
          ) : (
            loading && (
              <div className='animate-pulse'>
                <span className='bg-gray-200 h-5 mb-1 w-60 block'></span>
                <span className='bg-gray-200 h-3 mb-1 w-44 block'></span>
                <span className='bg-gray-200 h-3 mb-1 w-32 block'></span>
                <span className='bg-gray-200 h-3 mb-1 w-28 block'></span>
              </div>
            )
          )}
        </div>
      ) : (
        loading && (
          <div className='animate-pulse'>
            <span className='bg-gray-200 h-5 mb-1 w-60 block'></span>
            <span className='bg-gray-200 h-3 mb-1 w-44 block'></span>
            <span className='bg-gray-200 h-3 mb-1 w-32 block'></span>
            <span className='bg-gray-200 h-3 mb-1 w-28 block'></span>
          </div>
        )
      )}
      {profile?.experience?.length > 0 ? (
        <div className='mb-3'>
          <p className='font-semibold text-2xl p-1 mb-2 border-b'>
            Experiences
          </p>
          {profile.experience.map((d, idx) => (
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
      ) : (
        loading && (
          <div className='animate-pulse'>
            <span className='bg-gray-200 h-5 mb-1 w-60 block'></span>
            <span className='bg-gray-200 h-3 mb-1 w-44 block'></span>
            <span className='bg-gray-200 h-3 mb-1 w-32 block'></span>
            <span className='bg-gray-200 h-3 mb-1 w-28 block'></span>
          </div>
        )
      )}
      {profile?.education.length > 0 ? (
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
              <p className='text-sm'>{d.desc}</p>
            </div>
          ))}
        </div>
      ) : (
        loading && (
          <div className='animate-pulse mt-5'>
            <span className='bg-gray-200 h-5 mb-1 w-60 block'></span>
            <span className='bg-gray-200 h-3 mb-1 w-44 block'></span>
            <span className='bg-gray-200 h-3 mb-1 w-32 block'></span>
            <span className='bg-gray-200 h-3 mb-1 w-28 block'></span>
          </div>
        )
      )}
    </div>
  );
};

export default DevAboutScreen;
