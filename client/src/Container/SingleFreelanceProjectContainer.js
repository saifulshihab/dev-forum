import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Project from '../Components/Project';

const SingleFreelanceProjectContainer = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState({});

  const freelanceProjectsGet = useSelector(
    (state) => state.freelanceProjectsGet
  );
  const { projects } = freelanceProjectsGet;

  useEffect(() => {
    const pro = projects?.find(
      (project) => project?._id.toString() === projectId.toString()
    );
    setProject(pro);
  }, [projectId, projects]);

  return (
    <>      
      <div className='p-1'>
        <Project project={project} noRoute />
      </div>
    </>
  );
};

export default SingleFreelanceProjectContainer;
