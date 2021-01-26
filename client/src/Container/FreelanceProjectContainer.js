import React from 'react';
import FreelanceProject from '../Components/FreelanceProject';
import { FreelanceProjectData } from '../Data';

const FreelanceProjectContainer = () => {
  return (
    <div>
      {FreelanceProjectData.map((project) => (
        <FreelanceProject project={project} />
      ))}
    </div>
  );
};

export default FreelanceProjectContainer;
