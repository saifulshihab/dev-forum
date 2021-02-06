import React, { useEffect, useState } from 'react';
import { baseURL } from '../../baseURL';
import axios from 'axios';
import Alert from '../../Components/Alert';
import Loader from '../../Components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import {
  editDevDp,
  fetchDevProfile,
  editDevCover,
} from '../../redux/action/DeveloperAction';

const DevPhotos = ({ user }) => {
  const dispatch = useDispatch();
  const [dp, setDp] = useState(user?.dp);
  const [cover, setCover] = useState(user?.cover);
  const [uploading, setUploading] = useState(false);

  const signInDev = useSelector((state) => state.signInDev);
  const { devInfo } = signInDev;

  const devDpEdit = useSelector((state) => state.devDpEdit);
  const {
    loading: dpEditLoading,
    success: dpEditSucccess,
    error: dpEditError,
  } = devDpEdit;
  const devCoverEdit = useSelector((state) => state.devCoverEdit);
  const {
    loading: coverEditLoading,
    success: coverEditSucccess,
    error: coverEditError,
  } = devCoverEdit;

  const uploadDpFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${devInfo.token}`,
        },
      };
      const { data } = await axios.post(baseURL + '/upload', formData, config);
      setDp(data);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  const uploadCoverFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${devInfo.token}`,
        },
      };
      const { data } = await axios.post(baseURL + '/upload', formData, config);
      setCover(data);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  useEffect(() => {
    if (dpEditSucccess || coverEditSucccess) {
      dispatch(fetchDevProfile(devInfo.username));
    }
  }, [dispatch, devInfo.username, dpEditSucccess, coverEditSucccess]);
  const dpUpdateHandler = () => {
    dispatch(editDevDp(dp));
    setUploading(false);
  };
  const coverUpdateHandler = () => {
    dispatch(editDevCover(cover));
    setUploading(false);
  };
  return (
    <>
      {uploading && <Alert success msg='Uploaded' />}
      <div className='dp_cover_uplaod flex '>
        <div className='w-2/5 flex flex-col space-y-2 justify-center'>
          <img
            className='rounded-full w-40 h-40 image_center'
            src={baseURL + user?.dp}
            alt={user?.username}
          />
          <input
            onChange={uploadDpFileHandler}
            type='file'
            className='none text-sm focus:outline-none'
          />
          {dpEditLoading ? (
            <Loader />
          ) : dpEditError ? (
            <Alert fail msg={dpEditError} />
          ) : (
            dpEditSucccess && <Alert success msg={'Dp Updated!'} />
          )}
          {uploading && (
            <button
              onClick={dpUpdateHandler}
              className='w-28 focus:outline-none focus:border-indigo-600 text-indigo-800 text-sm p-1 px-4 rounded border-dotted border-4 border-light-blue-500'
            >
              Update Dp
            </button>
          )}
        </div>
        <div className='w-3/5 flex flex-col space-y-1 justify-center'>
          <img
            className='w-full h-40 image_center'
            src={baseURL + user?.cover}
            alt={user?.username}
          />
          <input
            type='file'
            onChange={uploadCoverFileHandler}
            className='none text-sm focus:outline-none'
          />
          {coverEditLoading ? (
            <Loader />
          ) : coverEditError ? (
            <Alert fail msg={coverEditError} />
          ) : (
            coverEditSucccess && <Alert success msg={'Cover Updated!'} />
          )}
          {uploading && (
            <button
              onClick={coverUpdateHandler}
              className='w-32 focus:outline-none focus:border-indigo-600 text-indigo-800 text-sm p-1 px-4 rounded border-dotted border-4 border-light-blue-500'
            >
              Update Cover
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default DevPhotos;
