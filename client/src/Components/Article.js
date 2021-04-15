import React, { Fragment, useRef, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import moment from 'moment';
import {
  deleteArticle,
  upvoteArticle,
  downvoteArticle,
  shareArticle,
} from '../redux/action/ArticleAction';
import ReactHtmlParser from 'react-html-parser';
import UpvoteIcon from './UpvoteIcon';
import DownvoteIcon from './DownvoteIcon';
import _ from 'lodash';
import ArticleCommentsContainer from '../Container/ArticleCommentsContainer';

const Article = ({ article, routeFromProfile, details, userId }) => {
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const [showComment, setshowComment] = useState(false);
  const [showMore, setshowMore] = useState(false);
  const [shoeArtileOption, serArticleOption] = useState(false);
  const [caption, setCaption] = useState('');
  const [articleId, setArticleId] = useState('');

  const [shareOpen, setShareOpen] = useState(false);
  const cancelButtonRef = useRef();

  const signInDev = useSelector((state) => state.signInDev);
  const { devInfo: currentUser } = signInDev;

  useEffect(() => {}, []);

  const closeDD = () => {
    serArticleOption(false);
  };

  const deleteArticleHandler = (id) => {
    closeDD();
    dispatch(deleteArticle(id));
  };

  const shareArticleHandler = () => {
    dispatch(shareArticle(articleId, caption));
  };

  return (
    <>
      <div className='w-full bg-white rounded shadow my-2 px-5 py-2'>
        <div className='flex h-16 items-center pb-2 my-1.5 border-b'>
          <div className='mr-3 w-6 h-full'>
            {_.findIndex(
              article?.upvote,
              (o) => o.user.toString() === currentUser._id.toString()
            ) > -1 ? (
              <button className='w-full outline-none focus:outline-none'>
                <UpvoteIcon color={true} />
              </button>
            ) : (
              <button
                className='w-full outline-none focus:outline-none'
                onClick={() => {
                  dispatch(
                    upvoteArticle(
                      article?._id,
                      details ? true : false,
                      routeFromProfile ? true : false
                    )
                  );
                }}
              >
                <UpvoteIcon />
              </button>
            )}
            {_.findIndex(
              article?.downvote,
              (o) => o.user.toString() === currentUser._id.toString()
            ) > -1 ? (
              <button className='w-full outline-none focus:outline-none'>
                <DownvoteIcon color={true} />
              </button>
            ) : (
              <button
                className='w-full outline-none focus:outline-none'
                onClick={() => {
                  dispatch(
                    downvoteArticle(
                      article?._id,
                      details ? true : false,
                      routeFromProfile ? true : false
                    )
                  );
                }}
              >
                <DownvoteIcon />
              </button>
            )}
          </div>
          <div className='h-full w-9/12'>
            <div className='h-8 w-auto overflow-hidden '>
              <Link
                to={
                  !details && !routeFromProfile
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
              <span className='mr-3'>
                <i className='fas fa-arrow-up mr-1'></i>
                {article?.upvote?.length} upvotes
              </span>
              <span className='mr-5'>
                <i className='fas fa-arrow-down mr-1'></i>
                {article?.downvote?.length} downvotes
              </span>
              <i className='fas fa-marker mr-1'></i>written by- @
              <Link to={`/h/user/${article?.user?.username}`}>
                <span className='cursor-pointer hover:text-indigo-600 '>
                  {article?.user?.username}
                </span>
              </Link>
              <span className='ml-4'>
                <i className='far fa-clock mr-1'></i>
                {moment(article?.createdAt).startOf('hour').fromNow()}
              </span>
            </div>
          </div>
        </div>

        {!details ? (
          <div
            className={`mt-3 ${
              showMore ? 'h-full' : 'max-h-60'
            } overflow-ellipsis ${!showMore && 'overflow-hidden'}`}
          >
            <div>{ReactHtmlParser(article?.description)}</div>
          </div>
        ) : (
          <div className={`mt-3 h-full max-h-50 overflow-ellipsis`}>
            <div>{ReactHtmlParser(article?.description)}</div>
          </div>
        )}

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
          <div
            onClick={() => {
              setArticleId(article?._id);
              setShareOpen(!shareOpen);
            }}
            className='w-1/2 flex items-center justify-center hover:text-indigo-600 border-r text-gray-500'
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
            <Transition.Root show={shareOpen} as={Fragment}>
              <Dialog
                as='div'
                static
                className='fixed z-10 inset-0 overflow-y-auto'
                initialFocus={cancelButtonRef}
                open={shareOpen}
                onClose={setShareOpen}
              >
                <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                  </Transition.Child>

                  {/* This element is to trick the browser into centering the modal contents. */}
                  <span
                    className='hidden sm:inline-block sm:align-middle sm:h-screen'
                    aria-hidden='true'
                  >
                    &#8203;
                  </span>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    enterTo='opacity-100 translate-y-0 sm:scale-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                    leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                  >
                    <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
                      <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                        <div className='sm:flex sm:items-start'>
                          <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-400 sm:mx-0 sm:h-10 sm:w-10'>
                            <i className='fas fa-share'></i>
                          </div>
                          <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                            <Dialog.Title
                              as='h3'
                              className='text-lg leading-6 font-medium text-gray-900'
                            >
                              Share Article
                            </Dialog.Title>
                            <div className='mt-2 w-full'>
                              <input
                                className='text-sm border-b p-.5 border-indigo-400 focus:outline-none w-full'
                                placeholder='Write a caption...'
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                        <button
                          type='button'
                          className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
                          onClick={() => {
                            shareArticleHandler();
                            setShareOpen(false);
                          }}
                        >
                          Share Now
                        </button>
                        <button
                          type='button'
                          className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                          onClick={() => setShareOpen(false)}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition.Root>
          </div>
        </div>
      </div>
      {details ? (
        <ArticleCommentsContainer article={article} />
      ) : (
        showComment && <ArticleCommentsContainer article={article} />
      )}
    </>
  );
};

export default Article;
