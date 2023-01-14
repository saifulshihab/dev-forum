import React from 'react';
import { Link } from 'react-router-dom';
import DownvoteIcon from './DownvoteIcon';
import UpvoteIcon from './UpvoteIcon';
import _ from 'lodash';
import {
  upvoteAnswer,
  downvoteAnswer,
  deleteAnswer,
} from '../redux/action/QuestionAction';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Answer = ({ ans }) => {
  const dispatch = useDispatch();

  const signInDev = useSelector((state) => state.signInDev);
  const { devInfo: currentUser } = signInDev;

  const deleteHandler = () => {
    dispatch(deleteAnswer(ans?._id));
  };

  return (
    <>
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="w-full items-center flex h-auto rounded-md my-2 px-5 py-1"
      >
        <div className="mr-3 h-10" style={{ width: '4%' }}>
          {_.findIndex(
            ans?.upvote,
            (o) => o.user.toString() === currentUser._id.toString()
          ) > -1 ? (
            <button className="w-full outline-none focus:outline-none">
              <UpvoteIcon fromAnswer color={true} />
            </button>
          ) : (
            <button
              className="w-full outline-none focus:outline-none"
              onClick={() => {
                dispatch(upvoteAnswer(ans?._id));
              }}
            >
              <UpvoteIcon fromAnswer />
            </button>
          )}
          {_.findIndex(
            ans?.downvote,
            (o) => o.user.toString() === currentUser._id.toString()
          ) > -1 ? (
            <button className="w-full outline-none focus:outline-none">
              <DownvoteIcon fromAnswer color={true} />
            </button>
          ) : (
            <button
              className="w-full outline-none focus:outline-none"
              onClick={() => {
                dispatch(downvoteAnswer(ans?._id));
              }}
            >
              <DownvoteIcon fromAnswer />
            </button>
          )}
        </div>
        <div className="h-full" style={{ width: '96%' }}>
          <div className="text-gray-500 dark:text-gray-300 text-justify text-sm">
            {ans?.answer}
          </div>
          <div className="text-gray-400 text-xs">
            <span className="mr-3">
              <i className="fas fa-arrow-up mr-1"></i>
              {ans?.upvote?.length}
            </span>
            <span className="mr-3">
              <i className="fas fa-arrow-down mr-1"></i>
              {ans?.downvote?.length}
            </span>
            <Link to={`/h/user/${ans?.user?.username}`}>
              answered by - @
              <span className="cursor-pointer hover:text-indigo-600 mr-5">
                {ans?.user?.username}
              </span>
            </Link>
            {currentUser?._id.toString() === ans?.user?._id?.toString() && (
              <button
                onClick={deleteHandler}
                className="focus:outline-none hover:text-gray-600"
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Answer;
