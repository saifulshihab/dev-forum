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
import { getDevPublicProfile } from '../../redux/action/DeveloperAction';
import DevAboutScreen from './DevAboutScreen';
import DevArticleScreen from './DevArticleScreen';
import DevProjectsScreen from './DevProjectsScreen';
import DevQuesAskScreen from './DevQuesAskScreen';
import DevTimelineScreen from './DevTimelineScreen';
import GithubScreen from './GithubScreen';

const DevProfilePublicView = ({ location, recruiterView }) => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { url, path } = useRouteMatch();
  const currentPath = location.pathname.split('/')[4];

  const devPublicView = useSelector((state) => state.devPublicView);
  const { loading, error, user } = devPublicView;

  useEffect(() => {
    dispatch(getDevPublicProfile(username, recruiterView));
  }, [dispatch, username, recruiterView]);

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
            <div className='name_address_location text-gray-600 text-md'>
              <h4 className='text-2xl font-extrabold'>{user?.full_name}</h4>
              <span className='text-gray-400'>@{user?.username}</span>
              <div className='h-5 mb-1'>{user?.bio}</div>
              <span className='mr-4'>
                {user?.email && (
                  <i className='mr-2 fas fa-envelope-open-text'></i>
                )}
                {user?.email}
              </span>
              <span>
                {user?.website && <i className='mr-2 fas fa-globe'></i>}
                {user?.website}
              </span>
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
                component={() => <DevTimelineScreen user={user} />}
              />
              <Route
                path={`${path}/projects`}
                component={() => <DevProjectsScreen user={user} />}
              />
              <Route
                path={`${path}/articles`}
                component={() => <DevArticleScreen user={user} />}
              />
              <Route
                path={`${path}/ques`}
                component={() => <DevQuesAskScreen user={user} />}
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
