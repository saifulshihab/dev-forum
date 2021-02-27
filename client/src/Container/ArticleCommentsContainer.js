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
    if (comments?.length === 0) {
      dispatch(fetchCommentArticle(article?._id));
    }
  }, [dispatch, comments, article?._id]);

  const commentHandler = () => {
    dispatch(commentOnArticle(article?._id, comment));
    setComment('');
  };
  return (
    <div
      className='py-2 bg-white max-h-96 overflow-hidden rounded shadow'
      style={{ overflowY: 'scroll' }}
    >
      <div className='px-5 text-gray-500 text-sm border-b pb-1'>
        <span className='mr-3'>{comments?.length} Comments</span>
        <span>{article?.shares?.length} Shares</span>
      </div>
      {loading ? (
        <CommentLoader />
      ) : error ? (
        <Alert fail msg={error} />
      ) : (
        <>
          <div className='my-2'>
            <div className='flex items-center'>
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder='Write your comment...'
                className='ml-3 p-1 px-6 mr-2 w-10/12 text-xs focus:outline-none border rounded-full'
              />
              <span
                className='cursor-pointer'
                onClick={() => setEmoji(!emojiOn)}
                style={{ position: 'absolute', left: '59%' }}
              >
                <i className='text-gray-400 far fa-grin'></i>
              </span>
              {emojiOn && (
                <Picker
                  style={{ position: 'absolute', left: '35%', top: '63%' }}
                  onSelect={(emoji) => {
                    setComment(comment + emoji.native);
                  }}
                />
              )}
              <button
                onClick={commentHandler}
                className='rounded-full border hover:bg-indigo-500 hover:text-white p-1 px-3 text-xs focus:outline-none font-semibold text-indigo-500'
              >
                Send
              </button>
            </div>
          </div>
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
