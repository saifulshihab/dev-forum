import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Alert from '../Components/Alert';
import JobCircular from '../Components/JobCircular';
import { getJobCirculars } from '../redux/action/DeveloperAction';
import ReactTagInput from '@pathofdev/react-tag-input';

const JobsContainer = () => {
  const dispatch = useDispatch();
  const [tags, setTags] = useState([]);

  const circularsGet = useSelector((state) => state.circularsGet);
  const { loading, circulars, error } = circularsGet;

  useEffect(() => {
    dispatch(getJobCirculars());
  }, [dispatch]);

  const circularList = circulars?.filter((circular) => {
    if (tags?.length < 1) {
      return circulars;
    } else {
      const contain = circular?.skills?.map((skill) => {
        const queryTag = tags.map((t) =>
          t.toLowerCase() === skill.toLowerCase() ? true : false
        );
        if (queryTag.includes(true)) {
          return true;
        } else {
          return false;
        }
      });
      if (contain.includes(true)) {
        return circular;
      } else {
        return null;
      }
    }
  });

  return (
    <div>
      <div>
        <div className='rounded bg-white mt-2 p-2 mb-2 shadow'>
          <div className='flex justify-between'>
            <span className='text-sm text-gray-500 font-semibold'>
              <i className='fas fa-filter text-gray-500 mr-1'></i>Filter Job
            </span>
            <span className='text-xs text-gray-500'>
              Available Job ({circularList?.length})
            </span>
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
        ) : circularList?.length > 0 ? (
          circularList?.map((circular) => (
            <JobCircular key={circular?._id} circular={circular} />
          ))
        ) : (
          <Alert warning msg='No circular posted yet!' />
        )}
      </div>
    </div>
  );
};

export default JobsContainer;
