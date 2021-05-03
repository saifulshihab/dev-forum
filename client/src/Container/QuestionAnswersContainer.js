import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../Components/Alert';
import Loader from '../Components/Loader';
import { addAnswer, getQuestionAnswers } from '../redux/action/QuestionAction';
import Answer from '../Components/Answer';
import { Picker } from 'emoji-mart';

const QuestionAnswersContainer = ({ question, details }) => {
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState('');
  const [emojiOn, setEmoji] = useState(false);

  const answersQuestion = useSelector((state) => state.answersQuestion);
  const { loading, answers, error } = answersQuestion;

  useEffect(() => {
    dispatch(getQuestionAnswers(question?._id));
  }, [dispatch, question?._id]);

  const keyHandler = (event) => {
    if (event.key === 'Enter' && answer !== '') {
      answerHandler();
    }
  };

  const answerHandler = () => {
    dispatch(addAnswer(question?._id, answer));
    setAnswer('');
  };

  return (
    <div
      className='py-2 bg-white max-h-96 overflow-hidden rounded shadow'
      style={{ overflowY: 'scroll' }}
    >
      <div className='pb-1 border-b text-sm text-gray-500 px-5'>
        {answers?.length} Answers
      </div>
      <div className='my-2'>
        <div className='flex items-center'>
          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyPress={keyHandler}
            placeholder='Write your answer...'
            className='ml-3 p-1 px-6 mr-2 w-10/12 text-xs focus:outline-none border rounded-full'
          />
          <span
            className='cursor-pointer'
            onClick={() => setEmoji(!emojiOn)}
            style={{ position: 'absolute', left: '59%' }}
          >
            <i className='text-gray-400 far fa-grin'></i>
          </span>
          <div>
            {emojiOn && (
              <Picker
                style={{ position: 'absolute' }}
                onSelect={(emoji) => {
                  setAnswer(answer + emoji.native);
                }}
              />
            )}
          </div>
          <button
            onClick={answerHandler}
            disabled={answer === ''}
            className={`rounded-full border ${
              answer !== '' && 'hover:text-white hover:bg-indigo-500'
            }
            ${answer === '' && 'opacity-30'}
            p-1 px-3 text-xs focus:outline-none font-semibold text-indigo-500`}
          >
            Send
          </button>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert fail msg={error} />
      ) : answers && answers?.length > 0 ? (
        answers?.map((ans) => <Answer key={ans?._id} ans={ans} />)
      ) : (
        <Alert msg='No answers yet!' />
      )}
    </div>
  );
};

export default QuestionAnswersContainer;
