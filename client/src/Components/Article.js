import { Transition } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import Comment from './Comment';
import Loader from '../Components/Loader';
import Alert from '../Components/Alert';
import { deleteArticle, getAllArticles } from '../redux/action/ArticleAction';
import { DELETE_SINGLE_ARTICLE_RESET } from '../redux/ActionTypes';
import ReactHtmlParser from 'react-html-parser';

const Article = ({ article, routeFromProfile }) => {
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const [showComment, setshowComment] = useState(false);
  const [showMore, setshowMore] = useState(false);
  const [shoeArtileOption, serArticleOption] = useState(false);

  const signInDev = useSelector((state) => state.signInDev);
  const { devInfo: currentUser } = signInDev;

  const deleteSingleArticle = useSelector((state) => state.deleteSingleArticle);
  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = deleteSingleArticle;

  useEffect(() => {
    if (deleteSuccess) {
      dispatch(getAllArticles());
      dispatch({
        type: DELETE_SINGLE_ARTICLE_RESET,
      });
    }
  }, [dispatch, deleteSuccess]);

  const closeDD = () => {
    serArticleOption(false);
  };

  const deleteArticleHandler = (id) => {
    closeDD();
    dispatch(deleteArticle(id));
  };

  return (
    <>
      <div className='w-full bg-white rounded shadow my-2 px-5 py-2'>
        <div className='flex h-16 items-center pb-2 my-1.5 border-b'>
          <div className='mr-3 w-6 h-full'>
            <div className='w-full cursor-pointer hover:bg-gray-300 bg-gray-200 mb-1 rounded-full text-gray-500'>
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
                  d='M5 15l7-7 7 7'
                />
              </svg>
            </div>
            <div className='w-full cursor-pointer hover:bg-gray-300 bg-gray-200 rounded-full text-gray-500'>
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
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </div>
          </div>
          <div className='h-full w-9/12'>
            <div className='h-8 w-auto overflow-hidden '>
              <Link
                to={
                  !routeFromProfile
                    ? `${url}/${article && article._id}`
                    : `/h/forum/articles/${article && article._id}`
                }
              >
                <div className='text-gray-600 hover:text-indigo-700 cursor-pointer text-xl font-semibold'>
                  {article.title}
                </div>
              </Link>
            </div>
            <div className='text-gray-400 text-xs'>
              <span className='mr-2'>{article.upvote} upvotes</span>
              <span className='mr-4'>{article.downvote} downvotes</span>
              written by- @
              <span className='cursor-pointer hover:text-indigo-600 '>
                {article.user.username}
              </span>
            </div>
          </div>
        </div>

        <div
          className={`mt-3 ${
            showMore ? 'h-full' : 'h-64'
          } max-h-full overflow-ellipsis ${!showMore && 'overflow-hidden'}`}
        >
          <div>{ReactHtmlParser(article?.description)}</div>
        </div>
        <span
          onClick={() => setshowMore(!showMore)}
          className='text-xs text-indigo-600 hover:text-indigo-800 cursor-pointer'
        >
          Show{showMore ? ' less' : ' more'}...
        </span>

        <div className='flex mt-3 border-t cursor-pointer pt-1 text-center space-x-2'>
          <div
            onClick={() => setshowComment(!showComment)}
            className='flex w-1/2 border-r items-center justify-center hover:text-indigo-600 text-gray-500'
          >
            <span className='w-4 mr-2'>
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
              Comment
            </span>
          </div>
          <div className='w-1/2 flex items-center justify-center hover:text-indigo-600 border-r text-gray-500'>
            <span className='w-4 mr-2'>
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
                  d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z'
                />
              </svg>
            </span>
            <span className='text-gray-500 hover:text-indigo-600 text-sm'>
              Share
            </span>
          </div>
          <div className='w-1/2 flex items-center justify-center hover:text-indigo-600 text-gray-500'>
            <span className='w-4 mr-2'>
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
                  d='M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z'
                />
              </svg>
            </span>
            <span
              onClick={() => serArticleOption(true)}
              className='text-gray-500 hover:text-indigo-600 text-sm'
            >
              More
            </span>
            {shoeArtileOption && (
              <div
                onClick={() => serArticleOption(false)}
                className='fixed top-0 left-0 right-0 bottom-0 w-full'
              ></div>
            )}
            <Transition
              show={shoeArtileOption}
              enter='transition ease-out duration-100 transform'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='transition ease-in duration-75 transform'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              {(ref) => (
                <div
                  ref={ref}
                  className='flex flex-col space-y-1 absolute right-25 text-sm text-gray-500 text-left mt-10 w-40 rounded-md shadow-lg p-2 bg-white ring-1 ring-black ring-opacity-5'
                  role='menu'
                  aria-orientation='vertical'
                  aria-labelledby='user-menu'
                >
                  {currentUser._id === article?.user?._id && (
                    <Link
                      to={
                        !routeFromProfile
                          ? `${url}/${article?._id}/edit`
                          : `/h/forum/articles/${article?._id}/edit`
                      }
                    >
                      <p className='p-1 hover:bg-gray-50'>
                        <i className='mr-2 far fa-edit'></i>Edit
                      </p>
                    </Link>
                  )}
                  {currentUser._id === article?.user?._id && (
                    <p
                      onClick={() => deleteArticleHandler(article?._id)}
                      className='p-1 hover:bg-gray-50'
                    >
                      <i className='mr-2 far fa-trash-alt'></i>Delete
                    </p>
                  )}

                  <p className='p-1 hover:bg-gray-50'>
                    <i className='mr-2 far fa-save'></i>Save
                  </p>
                  <p className='p-1 hover:bg-gray-50'>
                    <Link
                      onClick={() => closeDD()}
                      to={
                        !routeFromProfile
                          ? `${url}/${article && article._id}`
                          : `/h/forum/articles/${article && article._id}`
                      }
                    >
                      <i className='mr-2 fas fa-info'></i>Details
                    </Link>
                  </p>
                  <p className='p-1 hover:bg-gray-50'>
                    <i className='mr-2 fas fa-arrow-up'></i>Upvote
                  </p>
                  <p className='p-1 hover:bg-gray-50'>
                    <i className='mr-2 fas fa-arrow-down'></i>Downvote
                  </p>
                </div>
              )}
            </Transition>
          </div>
        </div>
        <div>
          {deleteLoading ? (
            <Loader />
          ) : (
            deleteError && <Alert fail msg={deleteError} />
          )}
        </div>
      </div>
      {showComment && (
        <div className='py-2 ml-6'>
          <div className='text-gray-500 text-sm border-b pb-1'>
            <span className='mr-3'>{article.comments.length} Comments</span>
            <span>{article.share} Shares</span>
          </div>
          {article.comments.map((comment) => (
            <Comment cmnt={comment} />
          ))}
        </div>
      )}
    </>
  );
};

export default Article;
