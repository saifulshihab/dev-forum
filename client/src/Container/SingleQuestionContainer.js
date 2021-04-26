import React from 'react';
import { useParams } from 'react-router';
import QuestionPost from '../Components/QuestionPost';

const SingleQuestionContainer = ({ questions }) => {
  const questionId = useParams();
  const qu = questions?.filter((data) => data?._id === questionId);
  console.log(qu);
  return (
    <div>
      <QuestionPost question={qu} />
    </div>
  );
};

export default SingleQuestionContainer;
