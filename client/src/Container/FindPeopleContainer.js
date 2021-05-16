import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDevelopers } from '../redux/action/DeveloperAction';
import Loader from '../Components/Loader';
import Alert from '../Components/Alert';
import Developer from '../Components/Developer';

const FindPeopleContainer = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');

  const developersGet = useSelector((state) => state.developersGet);
  const { loading, developers, error } = developersGet;

  useEffect(() => {
    dispatch(getDevelopers());
  }, [dispatch]);

  const developerList = developers?.filter((user) =>
    searchText !== ''
      ? user?.full_name?.toLowerCase().includes(searchText?.toLocaleLowerCase())
      : user
  );
  return (
    <div className='px-2'>
      <div className='w-full mb-2 shadow bg-white rounded p-2'>
        <div>
          <p className='font-semibold text-gray-500 text-sm' htmlFor='srcName'>
            Search by Name
          </p>
        </div>
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder='Type a name...'
          className='w-full py-1 focus:outline-none border-b focus:border-blue-500 focus:border-b-2 text-sm'
        />
      </div>
      <div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Alert fail msg={error} />
        ) : developerList?.length > 0 ? (
          developerList
            ?.sort((a, b) => (a?.full_name > b?.full_name ? 1 : -1))
            ?.map((developer) => (
              <Developer key={developer?._id} user={developer} />
            ))
        ) : (
          <Alert msg='No Developers!' />
        )}
      </div>
    </div>
  );
};

export default FindPeopleContainer;
