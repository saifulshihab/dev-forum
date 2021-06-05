import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Comment from '../Components/Comment';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import CommentLoader from '../Components/CommentLoader';
import Alert from '../Components/Alert';
import {
  fetchCommentArticle,
  commentOnArticle,
} from '../redux/action/ArticleAction';

const ArticleCommentsContainer = ({ article }) => {
  const dispatch = useDispatch();
  const articleComments = useSelector((state) => state.articleComments);
  const { loading, comments, error } = articleComments;
  const [emojiOn, setEmoji] = useState(false);
  const [comment, setComment] = useState('');

  useEffect(() => {
    dispatch(fetchCommentArticle(article?._id));
  }, [dispatch, article?._id]);

  const keyHandler = (event) => {
    if (event.key === 'Enter' && comment !== '') {
      commentHandler();
    }
  };

  const commentHandler = () => {
    dispatch(commentOnArticle(article?._id, comment));
    setComment('');
  };
  return (
    <div
      className='py-2 bg-white dark:bg-gray-700 max-h-96 overflow-hidden rounded shadow'
      style={{ overflowY: 'scroll' }}
    >
      <div className='px-5 text-gray-500 dark:text-gray-300 text-sm border-b dark:border-gray-600 pb-1'>
        <span className='mr-3'>{comments?.length} Comments</span>
        <span>{article?.shares?.length} Shares</span>
      </div>

      <div className='flex items-center my-2'>
        <div className='flex-grow flex items-center'>
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyPress={keyHandler}
            placeholder='Write your comment...'
            className='flex-1 dark:bg-gray-800 dark:text-gray-300 ml-3 p-1 px-6 mr-2 w-10/12 text-xs focus:outline-none border dark:border-gray-600 rounded-full'
          />
          <div>
            <span className='cursor-pointer' onClick={() => setEmoji(!emojiOn)}>
              <i className='text-gray-400 far fa-grin'></i>
            </span>
          </div>
          <div className='absolute right-0' style={{ left: '75%' }}>
            {emojiOn && (
              <Picker
                onSelect={(emoji) => {
                  setComment(comment + emoji.native);
                }}
              />
            )}
          </div>
        </div>
        <button
          onClick={commentHandler}
          disabled={comment === ''}
          className={`rounded-full border dark:border-gray-600 ${
            comment !== '' && 'hover:text-white hover:bg-indigo-500'
          }
          ${comment === '' && 'opacity-30'}
          mx-2 p-1 px-3 text-xs focus:outline-none font-semibold text-indigo-500`}
        >
          Send
        </button>
      </div>

      {loading ? (
        <CommentLoader />
      ) : error ? (
        <Alert fail msg={error} />
      ) : (
        <>
          {comments.length > 0 &&
            comments?.map((comment) => (
              <Comment key={comment?._id} cmnt={comment} />
            ))}
        </>
      )}
    </div>
  );
};

export default ArticleCommentsContainer;
