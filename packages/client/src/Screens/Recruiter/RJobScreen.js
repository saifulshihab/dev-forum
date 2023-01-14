import React from 'react';
import { useRouteMatch } from 'react-router';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import RSingleJobContainer from '../../Container/RSingleJobContainer';
import CreateCircularScreen from './CreateCircularScreen';
import RBrowseJobScreen from './RBrowseJobScreen';

const RJobScreen = ({ location }) => {
  const { path, url } = useRouteMatch();
  const currentPath = location?.pathname?.split('/')[3];

  return (
    <div className='grid grid-cols-4 h-full'>
      <div className='col-span-3'>
        <div className='heading'>
          <nav className='bg-gray-100 dark:bg-gray-800'>
            <div className='max-w-7xl border-b-4 dark:border-gray-700 border-white mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='flex items-center justify-between h-10'>
                <div className='flex items-center'>
                  <div className='hidden md:block'>
                    <div className='flex items-baseline space-x-4'>
                      <Link to={`${url}/browse`}>
                        <div
                          className={`flex items-center cursor-pointer ${
                            currentPath === 'browse' && 'bg-white dark:bg-gray-700'
                          }  text-gray-600 hover:bg-white dark:hover:bg-gray-700 dark:text-gray-300 px-3 py-2.5 text-sm font-medium`}
                        >
                          <span className='h-full text-blue-600 w-4 mr-1'>
                            <i className='fab fa-chrome'></i>
                          </span>
                          <span className='h-full'>Browse</span>
                        </div>
                      </Link>
                      <Link to={`${url}/post-circular`}>
                        <div
                          className={`flex items-center cursor-pointer ${
                            (currentPath === 'post-circular' || undefined) &&
                            'bg-white dark:bg-gray-700'
                          } text-gray-600 hover:bg-white dark:hover:bg-gray-700 dark:text-gray-300 px-3 py-2.5 text-sm font-medium`}
                        >
                          <span className='h-full text-yellow-600 w-4 mr-1'>
                            <i className='fas fa-newspaper'></i>
                          </span>
                          <span className='h-full'>Post a Circular</span>
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
              exact
              path={`${path}/browse/:circularId`}
              component={() => <RSingleJobContainer />}
            />
            <Route
              path={`${path}/browse`}
              component={() => <RBrowseJobScreen />}
            />
            <Route
              path={`${path}/post-circular`}
              component={() => <CreateCircularScreen />}
            />
            <Redirect to={`${path}/browse`} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default RJobScreen;
