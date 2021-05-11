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
    <div>
      <div className='p-2 mb-1 bg-white flex items-center  text-gray-600'>
        <i className='fas fa-code mr-2'></i>
        <p className='text-lg font-semibold'>Browse Projects</p>
      </div>
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
    </div>
  );
};

export default RProjectContainer;
