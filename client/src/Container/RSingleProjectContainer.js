import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Project from '../Components/Project';
import { FreelanceProjectData } from '../Data';

const RSingleProjectContainer = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState({});

  useEffect(() => {
    const pro = FreelanceProjectData?.find(
      (project) => project?._id.toString() === projectId.toString()
    );
    setProject(pro);
  }, [projectId]);

  return (
    <div>
      <div className='p-2 mb-1 bg-white flex items-center  text-gray-600'></div>
      <div className='p-1'>
        <Project project={project} recruiter />
      </div>
    </div>
  );
};

export default RSingleProjectContainer;
