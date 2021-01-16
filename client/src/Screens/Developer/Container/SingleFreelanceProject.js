import React from 'react';
import { useParams } from 'react-router';
import FProjectDetails from '../../../Components/FProjectDetails';
import { FreelanceProjectData } from '../../../Data';

const SingleFreelanceProject = () => {
  const { projectId } = useParams();
  return (
    <>
      {FreelanceProjectData.map(
        (pro) =>
          pro._id.toString() === projectId.toString() && (
            <FProjectDetails key={projectId} project={pro} />
          )
      )}
    </>
  );
};

export default SingleFreelanceProject;
