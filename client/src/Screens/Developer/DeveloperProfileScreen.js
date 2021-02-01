import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import DevAboutScreen from './DevAboutScreen';
import GithubScreen from './GithubScreen';
import DevProjectsScreen from './DevProjectsScreen';
import DevArticleScreen from './DevArticleScreen';
import DevQuesAskScreen from './DevQuesAskScreen';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Components/Loader';
import { fetchDevProfile } from '../../redux/action/DeveloperAction';
import Alert from '../../Components/Alert';

const DeveloperProfileScreen = () => {
  const { url, path } = useRouteMatch();
  const dispatch = useDispatch();

  const [aboutOn, setAbout] = useState(true);
  const [githubOn, setGithub] = useState(false);
  const [projectsOn, setProjects] = useState(false);
  const [articleOn, setArticle] = useState(false);
  const [ques, setQues] = useState(false);

  const signInDev = useSelector((state) => state.signInDev);
  const { devInfo } = signInDev;
  const devProfile = useSelector((state) => state.devProfile);
  const { loading, error, user } = devProfile;

  useEffect(() => {
    dispatch(fetchDevProfile(devInfo.username));
    return () => {};
  }, [dispatch, devInfo.username]);

  return (
    <div className='profile p-1'>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert fail msg={error} />
      ) : (
        <>
          <div className='dev_dp_cover w-full'>
            <div className='cover w-full'>
              <img
                className='image_center w-full h-48'
                src='https://picsum.photos/seed/picsum/960/960'
                alt='cover'
              />
            </div>
            <div className='dp w-40'>
              <img
                className='image_center border-2 border-indigo-400 rounded-full w-full h-40'
                src='https://picsum.photos/seed/picsum/200/300'
                alt='dp'
              />
            </div>
          </div>
          <div className='name_others rounded mt-1 p-3 bg-white'>
            <div className=''>
              <h4 className='text-2xl font-extrabold'>{user?.full_name}</h4>
              <span className='text-gray-400'>@{user?.username}</span>
              <div className='h-5'>{user?.bio}</div>
              <div className='text-gray-600'>
                <span className='mr-4'>
                  <i className='mr-2 fas fa-envelope-open-text'></i>
                  {user.email}
                </span>
                <span>
                  <i className='mr-2 fas fa-globe'></i>
                  {user.website}
                </span>
              </div>
              <div className='flex items-center text-gray-600'>
                <span className='mr-4'>
                  <i className='mr-2 far fa-calendar-alt'></i>Joined{' '}
                  {new Date(user.createdAt).toLocaleDateString('en-gb', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span className=''>
                  <i className='fas mr-2 fa-map-marker-alt'></i>
                  {user.location}
                </span>
              </div>
            </div>
          </div>
          <div className='others mt-2'>
            <nav className='bg-gray-100 text-dark'>
              <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-2'>
                <div className='flex items-center justify-between h-10'>
                  <div className='flex items-center'>
                    <div className='hidden md:block'>
                      <div className='flex items-baseline space-x-4'>
                        <Link
                          onClick={() => {
                            setAbout(true);
                            setGithub(false);
                            setProjects(false);
                            setArticle(false);
                            setQues(false);
                          }}
                          to={`${url}/about`}
                        >
                          <div
                            className={`flex items-center cursor-pointer ${
                              aboutOn && 'bg-white'
                            } text-gray-600 hover:bg-white hover:text-gray-600 px-3 py-2.5 text-sm font-medium`}
                          >
                            <i className='far fa-address-card mr-2'></i>
                            <span className='h-full'>About</span>
                          </div>
                        </Link>
                        <Link
                          onClick={() => {
                            setAbout(false);
                            setGithub(true);
                            setProjects(false);
                            setArticle(false);
                            setQues(false);
                          }}
                          to={`${url}/gh-profile`}
                        >
                          <div
                            className={`flex items-center cursor-pointer ${
                              githubOn && 'bg-white'
                            } text-gray-600 hover:bg-white hover:text-gray-600 px-3 py-2.5 text-sm font-medium`}
                          >
                            <i className='fas fa-code-branch mr-2'></i>
                            <span className='h-full'>GitHub</span>
                          </div>
                        </Link>
                        <Link
                          onClick={() => {
                            setAbout(false);
                            setGithub(false);
                            setProjects(true);
                            setArticle(false);
                            setQues(false);
                          }}
                          to={`${url}/projects`}
                        >
                          <div
                            className={`flex items-center cursor-pointer ${
                              projectsOn && 'bg-white'
                            } text-gray-600 hover:bg-white hover:text-gray-600 px-3 py-2.5 text-sm font-medium`}
                          >
                            <i className='fas fa-tasks mr-2'></i>
                            <span className='h-full'>Projects</span>
                          </div>
                        </Link>
                        <Link
                          onClick={() => {
                            setAbout(false);
                            setGithub(false);
                            setProjects(false);
                            setArticle(true);
                            setQues(false);
                          }}
                          to={`${url}/articles`}
                        >
                          <div
                            className={`flex items-center cursor-pointer ${
                              articleOn && 'bg-white'
                            }  text-gray-600 hover:bg-white hover:text-gray-600 px-3 py-2.5 text-sm font-medium`}
                          >
                            <i className='far fa-newspaper mr-2'></i>
                            <span className='h-full'>Article</span>
                          </div>
                        </Link>
                        <Link
                          onClick={() => {
                            setAbout(false);
                            setGithub(false);
                            setProjects(false);
                            setArticle(false);
                            setQues(true);
                          }}
                          to={`${url}/ques`}
                        >
                          <div
                            className={`flex items-center cursor-pointer ${
                              ques && 'bg-white'
                            }  text-gray-600 hover:bg-white hover:text-gray-600 px-3 py-2.5 text-sm font-medium`}
                          >
                            <i className='fas fa-question mr-2'></i>

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
                <Route
                  exact
                  path={path}
                  component={() => <DevAboutScreen profile={user} />}
                />
                <Route
                  path={`${path}/about`}
                  component={() => <DevAboutScreen profile={user} />}
                />
                <Route
                  path={`${path}/gh-profile`}
                  component={() => <GithubScreen username={user.github} />}
                />
                <Route
                  path={`${path}/projects`}
                  component={DevProjectsScreen}
                />
                <Route path={`${path}/articles`} component={DevArticleScreen} />
                <Route path={`${path}/ques`} component={DevQuesAskScreen} />
              </Switch>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DeveloperProfileScreen;
