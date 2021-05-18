import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../Components/Modal';
import MyTextField from '../../Components/MyTextField';
import Alert from '../../Components/Alert';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  getRecruiterProfile,
  resetPasswordRec,
} from '../../redux/action/RecruiterAction';

const RSettingsScreen = () => {
  const dispatch = useDispatch();

  const [resetModal, setResetModal] = useState(false);

  const recResetPassword = useSelector((state) => state.recResetPassword);
  const {
    loading: resetLoading,
    success: resetSuccess,
    error: resetError,
  } = recResetPassword;

  useEffect(() => {
    dispatch(getRecruiterProfile());

    if (resetSuccess) {
      setResetModal(false);
    }
    return () => {};
  }, [dispatch, resetSuccess]);

  const formValidationSchema = yup.object().shape({
    p_password: yup
      .string()
      .min(6, 'Minimum 6 character!')
      .max(10, 'Maximum 10 character!')
      .required('Previous Password Required!'),
    new_password: yup
      .string()
      .min(6, 'Minimum 6 character!')
      .max(10, 'Maximum 10 character!')
      .required('Previous Password Required!'),
    retype_new_password: yup
      .string()
      .min(6, 'Minimum 6 character!')
      .max(10, 'Maximum 10 character!')
      .required('Previous Password Required!'),
  });

  return (
    <div className='p-1 text-gray-500'>
      <div className='account_wrapper shadow rounded mb-2 bg-white w-full h-12 px-3 flex items-center'>
        <div className=''>
          <p className='text-lg font-semibold'>Account settings</p>
        </div>
        <div className='ml-auto'></div>
      </div>

      <d className='mb-2 bg-white shadow rounded w-full h-12 px-3 flex items-center'>
        <div className=''>
          <p className='text-lg font-semibold'>Reset Password</p>
        </div>
        <div className='ml-auto'>
          <button
            onClick={() => setResetModal(true)}
            className='h-8 rounded px-4 bg-green-500 outline-none focus:outline-none text-sm font-semibold text-white'
          >
            <i className='fas fa-sync-alt mr-2'></i>Reset
          </button>
        </div>
      </d>

      <Modal
        modalOpen={resetModal}
        setModalOpen={setResetModal}
        title='Reset Password'
        titleIcon='fas fa-key'
      >
        <Formik
          initialValues={{
            p_password: '',
            new_password: '',
            retype_new_password: '',
          }}
          validationSchema={formValidationSchema}
          onSubmit={(data, { setSubmitting }) => {
            dispatch(resetPasswordRec(data));
            setSubmitting(false);
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <MyTextField
                label='Previous Password'
                name='p_password'
                type='password'
                placeholder='Enter previous password'
              />
              <MyTextField
                label='New Password'
                name='new_password'
                type='password'
                placeholder='Enter new password'
              />
              <MyTextField
                label='Retype Password'
                name='retype_new_password'
                type='password'
                placeholder='Retype new password'
              />
              <button
                type='submit'
                className={`text-white bg-indigo-600 ${
                  resetLoading && 'bg-indigo-300'
                } focus:outline-none focus:bg-indigo-500 py-1.5 w-full rounded font-semibold mt-2`}
                disabled={isSubmitting}
              >
                {resetLoading ? 'Reseting...' : 'Reset'}
              </button>
            </form>
          )}
        </Formik>
        {resetError && <Alert fail msg={resetError} />}
      </Modal>
    </div>
  );
};

export default RSettingsScreen;
