import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { baseURL } from '../baseURL';
import Spinner from './Spinner';
import {
  followOther,
  getFollowing,
  unfollowOther,
} from '../redux/action/DeveloperAction';
import { useDispatch, useSelector } from 'react-redux';
import Alert from './Alert';

const Developer = ({ user, recruiterView }) => {
  const dispatch = useDispatch();

  const signInDev = useSelector((state) => state.signInDev);
  const { devInfo: currentUser } = signInDev;

  const followGet = useSelector((state) => state.followGet);
  const {
    loading: followLoading,
    success: followSuccess,
    error: followError,
  } = followGet;

  const unfollowGet = useSelector((state) => state.unfollowGet);
  const {
    loading: unfollowLoading,
    success: unfollowSuccess,
    error: unfollowError,
  } = unfollowGet;

  const followingGet = useSelector((state) => state.followingGet);
  const { following } = followingGet;

  useEffect(() => {
    dispatch(getFollowing(currentUser?._id));
    if (followSuccess || unfollowSuccess) {
      dispatch(getFollowing(currentUser?._id));
    }
  }, [dispatch, currentUser?._id, followSuccess, unfollowSuccess]);

  const followHandler = () => {
    dispatch(followOther(user?._id));
  };

  const unfollowHandler = () => {
    dispatch(unfollowOther(user?._id));
  };

  const currentUserFollowings = following?.map(
    (data) => data?.user?._id?.toString() === user?._id?.toString()
  );
  const isFollowed = currentUserFollowings?.includes(true) ? true : false;

  return (
    <div className='w-full bg-white dark:bg-gray-800 rounded p-2 shadow mb-2 flex items-center justify-between'>
      <div className='flex items-center'>
        <div className='w-10 h-10 mr-2'>
          <Link
            to={`${
              recruiterView
                ? `/r/user/${user?.username}`
                : `/h/user/${user?.username}`
            }`}
          >
            <img
              className='w-full h-full rounded-full'
              src={user?.dp ? baseURL + user?.dp : 'https://picsum.photos/200'}
              alt='dp'
            />
          </Link>
        </div>
        <div className='text-gray-500 dark:text-gray-300'>
          <Link
            to={`${
              recruiterView
                ? `/r/user/${user?.username}`
                : `/h/user/${user?.username}`
            }`}
          >
            <p className='hover:text-indigo-500 font-semibold'>
              {user?.full_name}
            </p>
          </Link>
          <p className='-mt-1 text-xs italic'>{user?.bio}</p>
          <div className={`flex mt-1 items-center text-xs`}>
            {user?.topSkills?.map((skill, idx) => (
              <span
                key={idx}
                className='pl-1 dark:bg-gray-700 dark:text-gray-300 bg-gray-200 mr-2 mb-2 text-xs text-gray-500 py-.5 px-1 rounded mb-1'
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div>
        {!recruiterView &&
          currentUser?._id !== user?._id &&
          (isFollowed ? (
            <button
              onClick={unfollowHandler}
              className='text-sm bg-indigo-500 text-white font-semibold py-1 px-3 rounded-md focus:outline-none hover:bg-indigo-600'
            >
              {unfollowLoading ? (
                <Spinner small />
              ) : (
                <i className='fas fa-user-minus mr-1'></i>
              )}
              Unfollow
            </button>
          ) : (
            <button
              onClick={followHandler}
              className='text-sm bg-indigo-500 text-white font-semibold py-1 px-3 rounded-md focus:outline-none hover:bg-indigo-600'
            >
              {followLoading ? (
                <Spinner small />
              ) : (
                <i className='fas fa-user-plus mr-1'></i>
              )}
              Follow
            </button>
          ))}
        {followError && <Alert msg={followError} fail />}
        {unfollowError && <Alert msg={unfollowError} fail />}
      </div>
    </div>
  );
};

export default Developer;
