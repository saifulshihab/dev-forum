import moment from 'moment';
import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { baseURL } from '../baseURL';

const QuestionPost = ({ question }) => {
  const [ansOpen, setAnsOpen] = useState(false);
  const { url } = useRouteMatch();

  return (
    <>
      <div className='w-full bg-white shadow rounded-md my-2 px-5 py-2 '>
        <div className='flex items-center'>
          <div className='w-10 h-10'>
            <img
              className='border w-full h-full rounded-full'
              src={baseURL + question?.user?.dp}
              alt={question?.user?.username}
            />
          </div>
          <div className='ml-2 w-40 h-10'>
            <h4 className='text-gray-700 font-medium cursor-pointer hover:text-gray-800'>
              <Link to={`/h/user/${question?.user?.username}`}>
                {question?.user?.full_name}
              </Link>
            </h4>
            <p className='-mt-0.5 text-gray-400 text-xs'>
              {moment(question?.createdAt).startOf('hour').fromNow(true)}
            </p>
          </div>
        </div>
        <div className='text-gray-600 hover:text-indigo-700 cursor-pointer text-xl'>
          <Link to={`${url}/${question?._id}`}>{question?.title}</Link>
        </div>
        <div
          onClick={() => setAnsOpen(!ansOpen)}
          className='flex items-center justify-center mt-3 border-t cursor-pointer pt-1 text-center'
        >
          <span className='w-4 hover:text-indigo-600 mr-2 text-gray-500'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z'
              />
            </svg>
          </span>
          <span className='text-gray-500 hover:text-indigo-600 text-sm'>
            {/* {`${question.answers.length} Answers`} */}
          </span>
        </div>
      </div>
      <div>
        {/* {ansOpen && question.answers.map((ans) => <Answer ans={ans} />)} */}
      </div>
    </>
  );
};

export default QuestionPost;
