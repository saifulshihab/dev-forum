import React from 'react';
import DevProject from '../Components/DevProject';

const DevProjectContainer = ({ projects }) => {
  return (
    <div className='p-1'>
      <div className='mt-3'>
        {projects?.map((project) => (
          <DevProject key={project?._id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default DevProjectContainer;
