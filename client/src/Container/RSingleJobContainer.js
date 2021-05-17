import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import JobCircular from '../Components/JobCircular';

const RSingleJobContainer = () => {
  const dispatch = useDispatch();
  const { circularId } = useParams();
  const [circular, setCircular] = useState({});

  const rcircularsGet = useSelector((state) => state.rcircularsGet);
  const { circulars } = rcircularsGet;

  useEffect(() => {
    const cir = circulars?.find(
      (circular) => circular?._id.toString() === circularId.toString()
    );
    setCircular(cir);
  }, [dispatch, circularId, circulars]);

  return (
    <div className='p-1'>
      <JobCircular circular={circular} recruiter noRoute details />
    </div>
  );
};

export default RSingleJobContainer;
