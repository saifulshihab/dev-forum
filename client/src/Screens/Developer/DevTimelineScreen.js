import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../../Components/Alert';
import Article from '../../Components/Article';
import Loader from '../../Components/Loader';
import {
  deleteSharedArticle,
  getSharedArticle,
} from '../../redux/action/ArticleAction';

const DevTimelineScreen = ({ user, recruiterView }) => {
  const dispatch = useDispatch();

  const sharedArticleGet = useSelector((state) => state.sharedArticleGet);
  const { loading, articles, error } = sharedArticleGet;

  const signInDev = useSelector((state) => state.signInDev);
  const { devInfo: currentUser } = signInDev;

  useEffect(() => {
    dispatch(getSharedArticle(user?._id, recruiterView));
  }, [dispatch, user?._id, recruiterView]);

  const deleteShareArticleHandler = (articleId) => {
    dispatch(deleteSharedArticle(articleId));
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : articles && articles?.length > 0 ? (
        articles?.map((data) => (
          <div key={data?._id} className='p-2 shadow mb-2 rounded'>
            <div className='flex'>
              <div className='mx-auto flex-shrink-0 dark:bg-gray-900 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-400 sm:mx-0 sm:h-10 sm:w-10'>
                <i className='fas fa-share'></i>
              </div>
              <div className='ml-3 text-gray-500 dark:text-gray-300'>
                <div className='text-sm'>
                  {user?.full_name}{' '}
                  <span className='font-semibold'>shared</span> this article.
                </div>
                <div className='flex text-xs text-gray-400'>
                  <span>
                    <i className='far fa-clock mr-1'></i>
                    {moment(data?.createdAt).startOf('hour').fromNow(true)}
                  </span>
                  {data?.user.toString() === currentUser?._id && (
                    <span
                      onClick={() => deleteShareArticleHandler(data?._id)}
                      className='ml-2 cursor-pointer'
                    >
                      <i className='far fa-trash-alt mr-1'></i>
                      Delete
                    </span>
                  )}
                </div>
              </div>
            </div>
            {data?.caption && (
              <div className='text-sm text-gray-600 dark:text-gray-300 mt-2'>{data?.caption}</div>
            )}
            <div className='pl-5'>
              <Article article={data?.article} />
            </div>
          </div>
        ))
      ) : (
        <Alert fail msg='No Data!' />
      )}
      {error && <Alert fail msg={error} />}
    </div>
  );
};

export default DevTimelineScreen;
