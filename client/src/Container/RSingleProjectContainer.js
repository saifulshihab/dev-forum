import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Loader from '../Components/Loader';
import Alert from '../Components/Alert';
import Project from '../Components/Project';
import { getProjectProposal } from '../redux/action/ProjectAction';
import Proposal from '../Components/Proposal';

const RSingleProjectContainer = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const [project, setProject] = useState({});

  const recProjects = useSelector((state) => state.recProjects);
  const { projects } = recProjects;

  const proposalGet = useSelector((state) => state.proposalGet);
  const {
    loading: getProposalLoading,
    proposals,
    error: getProposalError,
  } = proposalGet;

  useEffect(() => {
    const pro = projects?.find(
      (project) => project?._id.toString() === projectId.toString()
    );
    setProject(pro);

    // get project proposals
    dispatch(getProjectProposal(projectId));
  }, [dispatch, projectId, projects]);

  return (
    <div>
      <div className='p-2 mb-1 bg-white flex items-center  text-gray-600'></div>
      <div className='p-1'>
        <Project project={project} recruiter noRoute />
      </div>
      <div className='bg-white p-1 rounded shadow'>
        <div className='mb-1 px-2'>
          <p className='font-semibold text-gray-500'>Proposal ({proposals ? proposals?.length : '0'})</p>
        </div>
        {getProposalLoading ? (
          <Loader />
        ) : getProposalError ? (
          <Alert fail msg={getProposalError} />
        ) : proposals?.length > 0 ? (
          proposals?.map((proposal) => (
            <Proposal key={proposal?._id} proposal={proposal} />
          ))
        ) : (
          <Alert msg={'No proposal yet!'} />
        )}
      </div>
    </div>
  );
};

export default RSingleProjectContainer;
