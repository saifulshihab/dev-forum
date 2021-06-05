import React, { useEffect, useState } from 'react';
import Project from '../Components/Project';
import Loader from '../Components/Loader';
import Alert from '../Components/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { getFreelanceProjects } from '../redux/action/ProjectAction';
import ReactTagInput from '@pathofdev/react-tag-input';

const FreelanceProjectContainer = () => {
  const dispatch = useDispatch();
  const [tags, setTags] = useState([]);

  const freelanceProjectsGet = useSelector(
    (state) => state.freelanceProjectsGet
  );
  const { loading, projects, error } = freelanceProjectsGet;

  useEffect(() => {
    dispatch(getFreelanceProjects());
  }, [dispatch]);

  const filterProjects = projects?.filter((project) => {
    if (tags?.length < 1) {
      return projects;
    } else {
      const contain = project?.technologies?.map((tech) => {
        const queryTag = tags.map((t) =>
          t.toLowerCase() === tech.toLowerCase() ? true : false
        );
        if (queryTag.includes(true)) {
          return true;
        } else {
          return false;
        }
      });
      if (contain.includes(true)) {
        return project;
      } else {
        return null;
      }
    }
  });

  return (
    <>
      <div className='rounded bg-white dark:bg-gray-700 mt-2 p-2 mb-2 shadow'>
        <div className='flex justify-between text-gray-500 dark:text-gray-300'>
        <span className='text-sm font-semibold'>
          <i className='fas fa-filter mr-1'></i>Filter Project
        </span>
        <span className='text-xs'>Available Projects ({filterProjects?.length})</span>
        </div>
        <div>
          <ReactTagInput
            placeholder='Add a Tag e.g (react, node.js, php)'
            maxTags='10'
            editable='true'
            tags={tags}
            removeOnBackspace={true}
            onChange={(newTag) => setTags(newTag)}
          />
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert fail msg={error} />
      ) : filterProjects?.length > 0 ? (
        filterProjects?.map((project) => (
          <Project key={project?._id} project={project} />
        ))
      ) : (
        <Alert warning msg='No projects available!' />
      )}
    </>
  );
};

export default FreelanceProjectContainer;
