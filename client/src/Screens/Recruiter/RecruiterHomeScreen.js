import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import SidebarSVG from '../../Components/SidebarSVG';
import RJobScreen from './RJobScreen';
import RNotificationScreen from './RNotificationScreen';
import RProfileScreen from './RProfileScreen';
import RProjectScreen from './RProjectScreen';

const RecruiterHomeScreen = ({ location }) => {
  const { path, url } = useRouteMatch();

  const pathName = location.pathname.split('/')[2];

  return (
    <div className='border-t-2'>
      <div className='grid grid-cols-5'>
        <div className='col-span-1 h-screen'>
          <ul className='text-gray-600'>
            <Link
              to={`${url}/projects`}
              className={pathName === 'projects' ? 'text-indigo-600' : ''}
            >
              <SidebarSVG
                d={'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'}
                text={'Projects'}
              />
            </Link>
            <Link
              to={`${url}/jobs`}
              className={pathName === 'jobs' ? 'text-indigo-600' : ''}
            >
              <SidebarSVG
                d={
                  'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                }
                text={'Jobs'}
              />
            </Link>

            <Link
              to={`${url}/notification`}
              className={pathName === 'notification' ? 'text-indigo-600' : ''}
            >
              <SidebarSVG
                d={
                  'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                }
                text={'Notification'}
              />
            </Link>
            <Link
              to={`${url}/settings`}
              className={pathName === 'settings' ? 'text-indigo-600' : ''}
            >
              <SidebarSVG
                d={
                  'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                }
                d1={'M15 12a3 3 0 11-6 0 3 3 0 016 0z'}
                text={'Settings'}
              />
            </Link>
            <Link
              to={`${url}/profile`}
              className={pathName === 'profile' ? 'text-indigo-600' : ''}
            >
              <SidebarSVG
                d={
                  'M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                }
                d1={'M15 12a3 3 0 11-6 0 3 3 0 016 0z'}
                text={'Profile'}
              />
            </Link>
          </ul>
        </div>
        <div className='col-span-4 h-full'>
          <div className='relative feed_right_content bg-gray-50 h-full'>
            <Switch>
              <Route path={`${path}/projects`} component={RProjectScreen} />
              <Route
                path={`${path}/jobs`}
                component={({ location }) => <RJobScreen location={location} />}
              />
              <Route
                path={`${path}/profile`}
                component={() => <RProfileScreen />}
              />
              <Route
                path={`${path}/notification`}
                component={() => <RNotificationScreen />}
              />
              <Redirect to={`${path}/projects`} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterHomeScreen;
