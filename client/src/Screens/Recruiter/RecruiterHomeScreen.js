import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import SidebarMenu from '../../Components/SidebarMenu';
import ChatScreen from '../Developer/ChatScreen';
import DevProfilePublicView from '../Developer/DevProfilePublicView';
import RJobScreen from './RJobScreen';
import RNotificationScreen from './RNotificationScreen';
import RProfileScreen from './RProfileScreen';
import RProjectScreen from './RProjectScreen';
import RSettingsScreen from './RSettingsScreen';

const RecruiterHomeScreen = ({ location }) => {
  const { path, url } = useRouteMatch();

  const pathName = location.pathname.split('/')[2];

  return (
    <div className='border-t-2 dark:border-gray-800 h-full'>
      <div className='grid grid-cols-5'>
        <div className='col-span-1 h-full'>
          <div className='h-full text-gray-600 dark:text-gray-400'>
            <Link
              to={`${url}/projects`}
              className={pathName === 'projects' ? 'text-indigo-600' : ''}
            >
              <SidebarMenu fontAwesome='fas fa-laptop-code' text={'Projects'} />
            </Link>
            <Link
              to={`${url}/jobs`}
              className={pathName === 'jobs' ? 'text-indigo-600' : ''}
            >
              <SidebarMenu fontAwesome='fas fa-briefcase' text={'Jobs'} />
            </Link>
            <Link
              to={`${url}/messages`}
              className={pathName === 'messages' ? 'text-indigo-600' : ''}
            >
              <SidebarMenu fontAwesome='fas fa-envelope' text={'Messages'} />
            </Link>
            <Link
              to={`${url}/notification`}
              className={pathName === 'notification' ? 'text-indigo-600' : ''}
            >
              <SidebarMenu fontAwesome='fas fa-bell' text={'Notification'} />
            </Link>
            <Link
              to={`${url}/settings`}
              className={pathName === 'settings' ? 'text-indigo-600' : ''}
            >
              <SidebarMenu fontAwesome='fas fa-cog' text={'Settings'} />
            </Link>
            <Link
              to={`${url}/profile`}
              className={pathName === 'profile' ? 'text-indigo-600' : ''}
            >
              <SidebarMenu fontAwesome='fas fa-user-circle' text={'Profile'} />
            </Link>
          </div>
        </div>
        <div className='col-span-4 w-full h-full'>
          <div className='bg-gray-50 dark:bg-gray-900 h-full min-h-screen w-full'>
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
                path={`${path}/settings`}
                component={() => <RSettingsScreen />}
              />
              <Route
                path={`${path}/messages`}
                component={() => <ChatScreen recruiter />}
              />
              <Route
                path={`${path}/user/:username`}
                component={() => (
                  <DevProfilePublicView location={location} recruiterView />
                )}
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
