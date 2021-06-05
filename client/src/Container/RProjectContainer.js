import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Project from '../Components/Project';
import { getRecProjects } from '../redux/action/RecruiterAction';
import Loader from '../Components/Loader';
import Alert from '../Components/Alert';

const RProjectContainer = () => {
  const dispatch = useDispatch();

  const recProjects = useSelector((state) => state.recProjects);
  const { loading, projects, error } = recProjects;

  useEffect(() => {
    dispatch(getRecProjects());
  }, [dispatch]);

  return (
    <div className='p-1'>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert fail msg={error} />
      ) : projects?.length > 0 ? (
        projects?.map((project) => (
          <Project key={project?._id} project={project} recruiter />
        ))
      ) : (
        <Alert warning msg='No projects posted yet!' />
      )}
    </div>
  );
};

export default RProjectContainer;
