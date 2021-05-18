import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Redirect,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from 'react-router';
import { Link } from 'react-router-dom';
import { baseURL } from '../../baseURL';
import Spinner from '../../Components/Spinner';
import {
  followOther,
  getDevPublicProfile,
  getFollowers,
  getFollowing,
  unfollowOther,
} from '../../redux/action/DeveloperAction';
import DevAboutScreen from './DevAboutScreen';
import DevArticleScreen from './DevArticleScreen';
import DevProjectsScreen from './DevProjectsScreen';
import DevQuesAskScreen from './DevQuesAskScreen';
import DevTimelineScreen from './DevTimelineScreen';
import GithubScreen from './GithubScreen';

const DevProfilePublicView = ({ location, recruiterView, followButton }) => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { url, path } = useRouteMatch();
  const currentPath = location.pathname.split('/')[4];

  const signInDev = useSelector((state) => state.signInDev);
  const { devInfo: currentUser } = signInDev;

  const devPublicView = useSelector((state) => state.devPublicView);
  const { loading, error, user } = devPublicView;

  const followersGet = useSelector((state) => state.followersGet);
  const { loading: followingLoading, followers } = followersGet;

  const followingGet = useSelector((state) => state.followingGet);
  const { loading: followersLoading, following } = followingGet;

  const followGet = useSelector((state) => state.followGet);
  const {
    loading: followLoading,
    success: followSuccess,
    // error: followError,
  } = followGet;

  const unfollowGet = useSelector((state) => state.unfollowGet);
  const {
    loading: unfollowLoading,
    success: unfollowSuccess,
    // error: unfollowError,
  } = unfollowGet;

  useEffect(() => {
    dispatch(getDevPublicProfile(username, recruiterView));
    dispatch(getFollowing(currentUser?._id));
    if (followSuccess || unfollowSuccess) {
      dispatch(getFollowing(currentUser?._id));
    }
    return () => {};
  }, [
    dispatch,
    username,
    recruiterView,
    currentUser?._id,
    followSuccess,
    unfollowSuccess,
  ]);

  useEffect(() => {
    dispatch(getFollowers(user?._id));
    dispatch(getFollowing(user?._id));

    return () => {};
  }, [dispatch, user]);

  const currentUserFollowers = followers?.map(
    (data) => data?.follower?._id?.toString() === currentUser?._id?.toString()
  );
  const isFollowed = currentUserFollowers?.includes(true) ? true : false;

  const followHandler = () => {
    dispatch(followOther(user?._id));
  };

  const unfollowHandler = () => {
    dispatch(unfollowOther(user?._id));
  };

  return (
    <>
      {error && error}
      <div className='p-1'>
        <div className='dev_dp_cover w-full'>
          <div className='cover w-full'>
            {loading ? (
              <div className='animate-pulse w-full h-48 bg-gray-200'></div>
            ) : (
              <img
                className='image_center w-full h-48'
                src={baseURL + user?.cover}
                alt='cover'
              />
            )}
          </div>
          <div className='dp w-40'>
            {loading ? (
              <div className='animate-pulse relative border-2 border-indigo-400 rounded-full w-full h-40 bg-gray-200'></div>
            ) : (
              <img
                className='image_center relative border-2 border-indigo-400 rounded-full w-full h-40'
                src={baseURL + user?.dp}
                alt='dp'
              />
            )}
          </div>
        </div>
        <div className='name_others rounded mt-1 p-3 bg-white'>
          {loading ? (
            <div className='name_address_location animate-pulse'>
              <span className='bg-gray-200 p-3 mb-1 px-28 w-40 block'></span>
              <span className='bg-gray-200 h-3 mb-1 w-20 block'></span>
              <div className='h-5 mb-1 w-44 bg-gray-200'></div>
              <span className='bg-gray-200 h-3 mb-1 w-28 block'></span>
              <span className='bg-gray-200 h-3 mb-1 w-40 block'></span>
              <span className='bg-gray-200 h-3 mb-1 w-20 block'></span>
            </div>
          ) : (
            <div className='name_address_location text-gray-600 text-sm'>
              <div className='flex items-center justify-between'>
                <h4 className='text-2xl font-extrabold'>{user?.full_name}</h4>
                <div className='flex items-center'>
                  <button className='border border-indigo-500 font-semibold bg-indigo-500 focus:outline-none px-2 py-1 text-sm hover:bg-indigo-600 text-white rounded'>
                    <i className='fas fa-paper-plane mr-1'></i>Send Message
                  </button>
                  {followButton &&
                    (isFollowed ? (
                      <button
                        onClick={unfollowHandler}
                        className='ml-2 border border-indigo-500 font-semibold bg-indigo-500 focus:outline-none px-2 py-1 text-sm hover:bg-indigo-600 text-white rounded'
                      >
                        {unfollowLoading ? (
                          <Spinner small />
                        ) : (
                          <i className='fas fa-user-minus mr-1'></i>
                        )}
                        Unfollow
                      </button>
                    ) : (
                      <button
                        onClick={followHandler}
                        className='ml-2 border border-indigo-500 font-semibold bg-indigo-500 focus:outline-none px-2 py-1 text-sm hover:bg-indigo-600 text-white rounded'
                      >
                        {followLoading ? (
                          <Spinner small />
                        ) : (
                          <i className='fas fa-user-plus mr-1'></i>
                        )}
                        Follow
                      </button>
                    ))}
                </div>
              </div>
              <div className='flex items-center'>
                <span className='text-gray-400'>@{user?.username}</span>
                {user?.workStatus !== 'off' && (
                  <div className='ml-2 flex justify-start items-center text-xs'>
                    <span className='w-3 h-3 rounded-full bg-green-400 mr-1'></span>
                    <span className='text-gray-400'>
                      Open to Work ({user?.workStatus})
                    </span>
                  </div>
                )}
              </div>
              <div className='h-5 mb-1'>{user?.bio}</div>
              <span className='mr-4'>
                {user?.email && (
                  <i className='mr-2 fas fa-envelope-open-text'></i>
                )}
                {user?.email}
              </span>
              <span>
                {user?.website && <i className='mr-2 fas fa-globe'></i>}
                <a
                  className='hover:text-indigo-500 hover:underline'
                  target='_blank'
                  rel='noreferrer'
                  href={user?.website}
                >
                  {user?.website}
                </a>
              </span>
              {!recruiterView &&
                (followersLoading || followingLoading ? (
                  <span className='bg-gray-200 h-3 mb-1 w-28 block'></span>
                ) : (
                  <div>
                    <i className='fas fa-users mr-1'></i> {followers?.length}{' '}
                    Followers {following?.length} Following
                  </div>
                ))}
              <div className='flex items-center '>
                <span className='mr-4'>
                  <i className='mr-2 far fa-calendar-alt'></i>Joined{' '}
                  {new Date(user?.createdAt).toLocaleDateString('en-gb', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span className=''>
                  {user?.location && (
                    <i className='fas mr-2 fa-map-marker-alt'></i>
                  )}
                  {user?.location}
                </span>
              </div>
            </div>
          )}

          <div className='social_links cursor-pointer mt-1 text-xl flex items-center space-x-2'>
            {loading ? (
              <div className='h-5 bg-gray-200 w-full'></div>
            ) : (
              user?.social.length > 0 &&
              user?.social.reverse().map((el, idx) => {
                const icn_cls =
                  el.platform === 'facebook'
                    ? 'fab fa-facebook text-blue-600 hover:text-blue-700'
                    : el.platform === 'twitter'
                    ? 'fab fa-twitter text-blue-400 hover:text-blue-500'
                    : el.platform === 'instagram'
                    ? 'fab fa-instagram text-pink-600 hover:text-pink-700'
                    : el.platform === 'linkedin'
                    ? 'fab fa-linkedin text-blue-700 hover:text-blue-800'
                    : el.platform === 'medium'
                    ? 'fab fa-medium text-blue-700 hover:text-blue-800'
                    : el.platform === 'github'
                    ? 'fab fa-github text-gray-800 hover:text-gray-900'
                    : el.platform === 'dribble'
                    ? 'fas fa-basketball-ball text-pink-500 hover:text-pink-600'
                    : el.platform === 'behance'
                    ? 'fab fa-behance-square text-blue-800 hover:text-blue-900'
                    : el.platform === 'portfolio'
                    ? 'fas fa-globe-asia text-gray-400 hover:text-gray-500'
                    : el.platform === 'stackoverflow' &&
                      'fab fa-stack-overflow text-yellow-600 hover:text-amber-700';
                return (
                  <a key={idx} href={el.link}>
                    <i className={icn_cls}></i>
                  </a>
                );
              })
            )}
          </div>
        </div>
        <div className='others mt-2'>
          <nav className='bg-gray-100 text-dark'>
            <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-2'>
              <div className='flex items-center justify-between h-10'>
                <div className='flex items-center'>
                  <div className='hidden md:block'>
                    <div className='flex items-baseline space-x-4'>
                      <Link to={`${url}/about`}>
                        <div
                          className={`flex items-center cursor-pointer ${
                            (currentPath === 'about' || undefined) &&
                            'bg-white border-indigo-500'
                          } text-gray-600 hover:bg-white border-t-2 border-transparent hover:text-gray-600 px-3 py-2.5 text-sm font-medium`}
                        >
                          <i className='far fa-address-card mr-2 text-blue-500'></i>
                          <span className='h-full'>About</span>
                        </div>
                      </Link>
                      <Link to={`${url}/timeline`}>
                        <div
                          className={`flex items-center cursor-pointer ${
                            currentPath === 'timeline' &&
                            'bg-white border-indigo-500'
                          } text-gray-600 hover:bg-white border-t-2 border-transparent hover:text-gray-600 px-3 py-2.5 text-sm font-medium`}
                        >
                          <i className='fas fa-stream mr-2 text-yellow-700'></i>
                          <span className='h-full'>Timeline</span>
                        </div>
                      </Link>
                      <Link to={`${url}/gh-profile`}>
                        <div
                          className={`flex items-center cursor-pointer ${
                            currentPath === 'gh-profile' &&
                            'bg-white border-indigo-500'
                          } text-gray-600 hover:bg-white border-t-2 border-transparent hover:text-gray-600 px-3 py-2.5 text-sm font-medium`}
                        >
                          <i className='fas fa-code-branch mr-2 text-green-600'></i>
                          <span className='h-full'>GitHub</span>
                        </div>
                      </Link>
                      <Link to={`${url}/projects`}>
                        <div
                          className={`flex items-center cursor-pointer ${
                            currentPath === 'projects' &&
                            'bg-white border-indigo-500'
                          } text-gray-600 hover:bg-white border-t-2 border-transparent hover:text-gray-600 px-3 py-2.5 text-sm font-medium`}
                        >
                          <i className='fas fa-tasks mr-2 text-yellow-500'></i>
                          <span className='h-full'>Projects</span>
                        </div>
                      </Link>
                      <Link to={`${url}/articles`}>
                        <div
                          className={`flex items-center cursor-pointer ${
                            currentPath === 'articles' &&
                            'bg-white border-indigo-500'
                          }  text-gray-600 hover:bg-white border-t-2 border-transparent hover:text-gray-600 px-3 py-2.5 text-sm font-medium`}
                        >
                          <i className='far fa-newspaper mr-2 text-purple-500'></i>
                          <span className='h-full'>Article</span>
                        </div>
                      </Link>
                      <Link to={`${url}/ques`}>
                        <div
                          className={`flex items-center cursor-pointer ${
                            currentPath === 'ques' &&
                            'bg-white border-indigo-500'
                          }  text-gray-600 hover:bg-white border-t-2 border-transparent hover:text-gray-600 px-3 py-2.5 text-sm font-medium`}
                        >
                          <i className='fas fa-question mr-2 text-red-500'></i>

                          <span className='h-full'>Question Asked</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <div className='question_article_feed p-2 bg-white w-full'>
            <Switch>
              {/* <Route
                exact
                path={path}
                component={() => <DevAboutScreen profile={user && user} />}
              /> */}
              <Route
                path={`${path}/about`}
                component={() => (
                  <DevAboutScreen profile={user && user} loading={loading} />
                )}
              />
              <Route
                path={`${path}/gh-profile`}
                component={() => <GithubScreen username={user?.github} />}
              />
              <Route
                path={`${path}/timeline`}
                component={() => (
                  <DevTimelineScreen
                    user={user}
                    recruiterView={recruiterView}
                  />
                )}
              />
              <Route
                path={`${path}/projects`}
                component={() => (
                  <DevProjectsScreen
                    user={user}
                    recruiterView={recruiterView}
                  />
                )}
              />
              <Route
                path={`${path}/articles`}
                component={() => (
                  <DevArticleScreen user={user} recruiterView={recruiterView} />
                )}
              />
              <Route
                path={`${path}/ques`}
                component={() => (
                  <DevQuesAskScreen user={user} recruiterView={recruiterView} />
                )}
              />
              <Redirect to={`${path}/about`} />
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
};

export default DevProfilePublicView;
