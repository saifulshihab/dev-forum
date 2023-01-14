import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Question from '../Components/Question';
import { getQuestions } from '../redux/action/QuestionAction';

const SingleQuestionContainer = () => {
  const dispatch = useDispatch();
  const { questionId } = useParams();

  const questionsGet = useSelector((state) => state.questionsGet);
  const { questions } = questionsGet;

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  const qu = questions?.find(
    (data) => data?._id.toString() === questionId.toString()
  );

  return (
    <div>
      <Question key={qu?._id} details question={qu} />
    </div>
  );
};

export default SingleQuestionContainer;
