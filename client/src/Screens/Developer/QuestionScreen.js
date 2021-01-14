import React from 'react';
import QuestionPost from '../../Components/QuestionPost';
import { Question } from '../../Data';

const QuestionScreen = ({}) => {
  return (
    <div>
      {Question.map((qu) => (
        <QuestionPost key={qu._id} question={qu} />
      ))}
    </div>
  );
};

export default QuestionScreen;
