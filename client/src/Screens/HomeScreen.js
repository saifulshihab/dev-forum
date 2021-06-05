import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import SidebarMenu from '../Components/SidebarMenu';
import AskQuestionsScreen from './Developer/AskQuestionsScreen';
import ChatScreen from './Developer/ChatScreen';
import DeveloperProfileScreen from './Developer/DeveloperProfileScreen';
import DevProfilePublicView from './Developer/DevProfilePublicView';
import FindPeopleScreen from './Developer/FindPeopleScreen';
import FreelanceScreen from './Developer/FreelanceScreen';
import JobsScreen from './Developer/JobsScreen';
import MoreScreen from './Developer/MoreScreen';
import NotificationScreen from './Developer/NotificationScreen';
import SettingsScreen from './Developer/SettingsScreen';

const HomeScreen = ({ location }) => {
  const { path, url } = useRouteMatch();

  const pathName = location.pathname.split('/')[2];

  return (
    <div className='border-t-2 dark:border-gray-800 h-full'>
      <div className='dark:bg-gray-900 grid grid-cols-5'>
        <div className='col-span-1 h-full'>
          <div className='text-gray-600 dark:text-gray-400 h-full'>
            <Link
              to={`${url}/forum`}
              className={
                pathName === 'forum' || undefined
                  ? 'text-indigo-600'
                  : ''
              }
            >
              <SidebarMenu fontAwesome='fas fa-users' text={'Forum'} />
            </Link>
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
              to={`${url}/people`}
              className={pathName === 'people' ? 'text-indigo-600' : ''}
            >
              <SidebarMenu
                fontAwesome='fas fa-user-plus'
                text={'Find People'}
              />
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
              <SidebarMenu fontAwesome='fas fa-user-circle' text='Profile' />
            </Link>
            <Link
              to={`${url}/more`}
              className={pathName === 'more' ? 'text-indigo-600' : ''}
            >
              <SidebarMenu fontAwesome='fas fa-ellipsis-h' text={'More'} />
            </Link>
          </div>
        </div>
        <div className='col-span-4 h-full w-full'>
          <div className='bg-gray-50 dark:bg-gray-900 h-full min-h-screen w-full'>
            <Switch>
              <Route path={`${path}/forum`} component={AskQuestionsScreen} />
              <Route path={`${path}/projects`} component={FreelanceScreen} />
              <Route path={`${path}/jobs`} component={JobsScreen} />
              <Route path={`${path}/people`} component={FindPeopleScreen} />
              <Route path={`${path}/messages`} component={ChatScreen} />
              <Route
                path={`${path}/notification`}
                component={NotificationScreen}
              />
              <Route path={`${path}/settings`} component={SettingsScreen} />
              <Route
                path={`${path}/profile`}
                component={DeveloperProfileScreen}
              />
              <Route path={`${path}/more`} component={MoreScreen} />
              <Route
                path={`${path}/user/:username`}
                component={() => (
                  <DevProfilePublicView
                    location={location}
                    recruiterView={false}
                    followButton
                  />
                )}
              />
              <Redirect to={`${path}/forum`} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
