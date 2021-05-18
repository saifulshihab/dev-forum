import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Alert from '../Components/Alert';
import JobCircular from '../Components/JobCircular';
import Loader from '../Components/Loader';
import Developer from '../Components/Developer';
import { getJobApplicants } from '../redux/action/CircularAction';

const RSingleJobContainer = () => {
  const dispatch = useDispatch();
  const { circularId } = useParams();
  const [circular, setCircular] = useState({});

  const rcircularsGet = useSelector((state) => state.rcircularsGet);
  const { circulars } = rcircularsGet;

  const jobApplicantsGet = useSelector((state) => state.jobApplicantsGet);
  const { loading, applicants, error } = jobApplicantsGet;

  useEffect(() => {
    const cir = circulars?.find(
      (circular) => circular?._id.toString() === circularId.toString()
    );
    setCircular(cir);
    // get job applicants
    dispatch(getJobApplicants(circularId));
  }, [dispatch, circularId, circulars]);

  return (
    <div className='p-1'>
      <JobCircular circular={circular} recruiter noRoute details />
      <div className='bg-white text-gray-500 rounded shadow p-1 mt-2'>
        <p className='font-semibold mb-2 border-b pb-1'>
          <i className='fas fa-users mr-1'></i>Applicants ({applicants ? applicants?.length : '0'})
        </p>
        {loading ? (
          <Loader />
        ) : error ? (
          <Alert fail msg={error} />
        ) : applicants?.length > 0 ? (
          applicants?.map((data) => (
            <Developer key={data?._id} user={data?.user} recruiterView />
          ))
        ) : (
          <Alert msg={'No applicants yet!'} />
        )}
      </div>
    </div>
  );
};

export default RSingleJobContainer;
