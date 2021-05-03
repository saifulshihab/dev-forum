import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../../Components/Alert';
import Question from '../../Components/Question';
import Loader from '../../Components/Loader';
import { getUserQuestions } from '../../redux/action/QuestionAction';

const DevQuesAskScreen = ({ user }) => {
  const dispatch = useDispatch();
  const userQuestions = useSelector((state) => state.userQuestions);
  const { loading, error, questions } = userQuestions;
  useEffect(() => {
    dispatch(getUserQuestions(user?._id));
    return () => {};
  }, [dispatch, user?._id]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert fail msg={error} />
      ) : questions?.length > 0 ? (
        questions.map((qu) => (
          <Question question={qu} key={qu?._id} />
        ))
      ) : (
        'No articles posted yet!'
      )}
    </div>
  );
};

export default DevQuesAskScreen;
