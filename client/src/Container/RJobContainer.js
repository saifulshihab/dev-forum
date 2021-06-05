import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Alert from '../Components/Alert';
import { getRecruiterCirculars } from '../redux/action/CircularAction';
import JobCircular from '../Components/JobCircular';

const RJobContainer = () => {
  const dispatch = useDispatch();

  const signInRec = useSelector((state) => state.signInRec);
  const { recInfo } = signInRec;

  const rcircularsGet = useSelector((state) => state.rcircularsGet);
  const { loading, circulars, error } = rcircularsGet;

  useEffect(() => {
    dispatch(getRecruiterCirculars(recInfo?._id));
  }, [dispatch, recInfo?._id]);

  return (
    <div className='p-1'>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert fail msg={error} />
      ) : circulars?.length > 0 ? (
        circulars?.map((circular) => (
          <JobCircular key={circular?._id} circular={circular} recruiter />
        ))
      ) : (
        <Alert warning msg='No circular posted yet!' />
      )}
    </div>
  );
};

export default RJobContainer;
