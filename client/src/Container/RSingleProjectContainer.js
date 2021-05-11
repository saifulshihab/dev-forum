import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Project from '../Components/Project';

const RSingleProjectContainer = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState({});

  const recProjects = useSelector((state) => state.recProjects);
  const { projects } = recProjects;

  useEffect(() => {
    const pro = projects?.find(
      (project) => project?._id.toString() === projectId.toString()
    );
    setProject(pro);
  }, [projectId, projects]);

  return (
    <div>
      <div className='p-2 mb-1 bg-white flex items-center  text-gray-600'></div>
      <div className='p-1'>
        <Project project={project} recruiter noRoute />
      </div>
    </div>
  );
};

export default RSingleProjectContainer;
