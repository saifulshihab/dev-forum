import React from 'react';
import { useParams } from 'react-router';
import JobDetails from '../Components/JobDetails';
import { JobData } from '../Data';

const SingleJobContainer = () => {
  const { jobId } = useParams();

  return (
    <div>
      {JobData.map(
        (el) => el.id.toString() === jobId.toString() && <JobDetails job={el} />
      )}
    </div>
  );
};

export default SingleJobContainer;
