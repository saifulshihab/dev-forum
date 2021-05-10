import React from 'react';
import { useRouteMatch } from 'react-router';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import CreateProjectScreen from './CreateProjectScreen';
import RBrowseProjectScreen from './RBrowseProjectScreen';

const RProjectScreen = ({ location }) => {
  const { path, url } = useRouteMatch();
  const currentPath = location?.pathname?.split('/')[3];

  return (
    <div className='grid grid-cols-4 h-full'>
      <div className='col-span-3'>
        <div className='heading'>
          <nav className='bg-gray-100 text-dark'>
            <div className='max-w-7xl border-b-4 border-white mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='flex items-center justify-between h-10'>
                <div className='flex items-center'>
                  <div className='hidden md:block'>
                    <div className='flex items-baseline space-x-4'>
                      <Link to={`${url}/browse`}>
                        <div
                          className={`flex items-center cursor-pointer ${
                            currentPath === 'browse' && 'bg-white'
                          }  text-gray-600 hover:bg-white hover:text-gray-600 px-3 py-2.5 text-sm font-medium`}
                        >
                          <span className='h-full text-blue-600 w-4 mr-1'>
                            <i className='fab fa-chrome'></i>
                          </span>
                          <span className='h-full'>Browse</span>
                        </div>
                      </Link>
                      <Link to={`${url}/post-project`}>
                        <div
                          className={`flex items-center cursor-pointer ${
                            (currentPath === 'post-project' || undefined) &&
                            'bg-white'
                          } text-gray-600 hover:bg-white hover:text-gray-600 px-3 py-2.5 text-sm font-medium`}
                        >
                          <span className='h-full text-indigo-600 w-4 mr-1'>
                            <i className='fas fa-pen-square'></i>
                          </span>
                          <span className='h-full'>Post a Project</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div className='question_article_feed'>
          <Switch>
            <Route
              path={`${path}/browse`}
              component={() => <RBrowseProjectScreen />}
            />
            <Route
              path={`${path}/post-project`}
              component={() => <CreateProjectScreen />}
            />
            <Redirect to={`${path}/browse`} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default RProjectScreen;
