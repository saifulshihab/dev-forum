import React, { useEffect } from 'react';
import Alert from '../Components/Alert';
import Loader from '../Components/Loader';
import { getQuestions } from '../redux/action/QuestionAction';
import { useDispatch, useSelector } from 'react-redux';
import QuestionPost from '../Components/QuestionPost';

const QuestionContainer = () => {
  const dispatch = useDispatch();

  const questionsGet = useSelector((state) => state.questionsGet);
  const { loading, questions, error } = questionsGet;

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert fail msg={error} />
      ) : questions && questions?.length > 0 ? (
        questions?.map((qu) => <QuestionPost key={qu?._id} question={qu} />)
      ) : (
        'No questions available!'
      )}
    </>
  );
};

export default QuestionContainer;
