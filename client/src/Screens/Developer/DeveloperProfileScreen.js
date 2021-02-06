import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import DevAboutScreen from './DevAboutScreen';
import GithubScreen from './GithubScreen';
import DevProjectsScreen from './DevProjectsScreen';
import DevArticleScreen from './DevArticleScreen';
import DevQuesAskScreen from './DevQuesAskScreen';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDevProfile } from '../../redux/action/DeveloperAction';
import Alert from '../../Components/Alert';
import DevProfileEditScreen from './DevProfileEditScreen';
import { baseURL } from '../../baseURL';
import DevPhotos from './DevPhotos';

const DeveloperProfileScreen = ({ location }) => {
  const { url, path } = useRouteMatch();
  const dispatch = useDispatch();

  const [aboutOn, setAbout] = useState(false);
  const [githubOn, setGithub] = useState(false);
  const [projectsOn, setProjects] = useState(false);
  const [articleOn, setArticle] = useState(false);
  const [ques, setQues] = useState(false);
  const [editOn, setEdit] = useState(false);
  const [photoOn, setPhotos] = useState(false);

  const signInDev = useSelector((state) => state.signInDev);
  const { devInfo } = signInDev;
  const devProfile = useSelector((state) => state.devProfile);
  const { loading, error, user } = devProfile;
  const currentPath = location.pathname.split('/')[3];
  useEffect(() => {
    if (!user || Object.keys(user).length === 0) {
      dispatch(fetchDevProfile(devInfo.username));
    }
    if (currentPath === undefined || currentPath === 'about') {
      setAbout(true);
      setGithub(false);
      setProjects(false);
      setArticle(false);
      setQues(false);
      setEdit(false);
      setPhotos(false);
    } else if (currentPath === 'gh-profile') {
      setGithub(true);
      setAbout(false);
      setProjects(false);
      setArticle(false);
      setQues(false);
      setEdit(false);
      setPhotos(false);
    } else if (currentPath === 'projects') {
      setProjects(true);
      setAbout(false);
      setGithub(false);
      setArticle(false);
      setQues(false);
      setEdit(false);
      setPhotos(false);
    } else if (currentPath === 'articles') {
      setArticle(true);
      setAbout(false);
      setGithub(false);
      setProjects(false);
      setQues(false);
      setEdit(false);
      setPhotos(false);
    } else if (currentPath === 'ques') {
      setQues(true);
      setAbout(false);
      setGithub(false);
      setProjects(false);
      setArticle(false);
      setEdit(false);
      setPhotos(false);
    } else if (currentPath === 'edit') {
      setEdit(true);
      setAbout(false);
      setGithub(false);
      setProjects(false);
      setArticle(false);
      setPhotos(false);
      setQues(false);
    } else if (currentPath === 'photos') {
      setPhotos(true);
      setEdit(false);
      setAbout(false);
      setGithub(false);
      setProjects(false);
      setArticle(false);
      setQues(false);
    }
    return () => {};
  }, [dispatch, devInfo.username, currentPath, user]);

  return (
    <div className='profile p-1'>
      {error && <Alert fail msg={error} />}
      <>
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
            <div className='name_address_location'>
              <h4 className='text-2xl font-extrabold'>{user?.full_name}</h4>
              <span className='text-gray-400'>@{user?.username}</span>
              <div className='h-5'>{user?.bio}</div>
              <div className='text-gray-600'>
                <span className='mr-4'>
                  <i className='mr-2 fas fa-envelope-open-text'></i>
                  {user?.email}
                </span>
                <span>
                  <i className='mr-2 fas fa-globe'></i>
                  {user?.website}
                </span>
              </div>
              <div className='flex items-center text-gray-600'>
                <span className='mr-4'>
                  <i className='mr-2 far fa-calendar-alt'></i>Joined{' '}
                  {new Date(user?.createdAt).toLocaleDateString('en-gb', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span className=''>
                  <i className='fas mr-2 fa-map-marker-alt'></i>
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
                            aboutOn && 'bg-white'
                          } text-gray-600 hover:bg-white hover:text-gray-600 px-3 py-2.5 text-sm font-medium`}
                        >
                          <i className='far fa-address-card mr-2 text-blue-500'></i>
                          <span className='h-full'>About</span>
                        </div>
                      </Link>
                      <Link to={`${url}/gh-profile`}>
                        <div
                          className={`flex items-center cursor-pointer ${
                            githubOn && 'bg-white'
                          } text-gray-600 hover:bg-white hover:text-gray-600 px-3 py-2.5 text-sm font-medium`}
                        >
                          <i className='fas fa-code-branch mr-2 text-green-600'></i>
                          <span className='h-full'>GitHub</span>
                        </div>
                      </Link>
                      <Link to={`${url}/projects`}>
                        <div
                          className={`flex items-center cursor-pointer ${
                            projectsOn && 'bg-white'
                          } text-gray-600 hover:bg-white hover:text-gray-600 px-3 py-2.5 text-sm font-medium`}
                        >
                          <i className='fas fa-tasks mr-2 text-yellow-500'></i>
                          <span className='h-full'>Projects</span>
                        </div>
                      </Link>
                      <Link to={`${url}/articles`}>
                        <div
                          className={`flex items-center cursor-pointer ${
                            articleOn && 'bg-white'
                          }  text-gray-600 hover:bg-white hover:text-gray-600 px-3 py-2.5 text-sm font-medium`}
                        >
                          <i className='far fa-newspaper mr-2 text-purple-500'></i>
                          <span className='h-full'>Article</span>
                        </div>
                      </Link>
                      <Link to={`${url}/ques`}>
                        <div
                          className={`flex items-center cursor-pointer ${
                            ques && 'bg-white'
                          }  text-gray-600 hover:bg-white hover:text-gray-600 px-3 py-2.5 text-sm font-medium`}
                        >
                          <i className='fas fa-question mr-2 text-red-500'></i>

                          <span className='h-full'>Question Asked</span>
                        </div>
                      </Link>
                      <Link to={`${url}/edit`}>
                        <div
                          className={`flex items-center cursor-pointer ${
                            editOn && 'bg-white'
                          }  text-gray-600 hover:bg-white hover:text-gray-600 px-3 py-2.5 text-sm font-medium`}
                        >
                          <i className='fas fa-edit mr-2 text-yellow-400'></i>

                          <span className='h-full'>Edit Profile</span>
                        </div>
                      </Link>
                      <Link to={`${url}/photos`}>
                        <div
                          className={`flex items-center cursor-pointer ${
                            photoOn && 'bg-white'
                          }  text-gray-600 hover:bg-white hover:text-gray-600 px-3 py-2.5 text-sm font-medium`}
                        >
                          <i className='fas fa-image mr-2 text-green-500'></i>

                          <span className='h-full'>Dp/Cover</span>
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
              <Route
                exact
                path={path}
                component={() => <DevAboutScreen profile={user && user} />}
              />
              <Route
                path={`${path}/about`}
                component={() => <DevAboutScreen profile={user && user} />}
              />
              <Route
                path={`${path}/gh-profile`}
                component={() => <GithubScreen username={user?.github} />}
              />
              <Route path={`${path}/projects`} component={DevProjectsScreen} />
              <Route path={`${path}/articles`} component={DevArticleScreen} />
              <Route path={`${path}/ques`} component={DevQuesAskScreen} />
              <Route
                path={`${path}/edit`}
                component={() => <DevProfileEditScreen user={user && user} />}
              />
              <Route
                path={`${path}/photos`}
                component={() => <DevPhotos user={user && user} />}
              />
            </Switch>
          </div>
        </div>
      </>
    </div>
  );
};

export default DeveloperProfileScreen;
