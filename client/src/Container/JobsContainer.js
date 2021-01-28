import React from 'react';
import Job from '../Components/Job';
import { JobData } from '../Data';

const JobsContainer = () => {
  return (
    <div>
      {JobData.map((job) => (
        <Job job={job} />
      ))}
    </div>
  );
};

export default JobsContainer;
