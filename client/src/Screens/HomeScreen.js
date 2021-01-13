import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import CustomSVG from '../Components/CustomSVG';
import AskQuestionsScreen from './Developer/AskQuestionsScreen';
import FindPeopleScreen from './Developer/FindPeopleScreen';
import FreelanceScreen from './Developer/FreelanceScreen';
import JobsScreen from './Developer/JobsScreen';
import MoreScreen from './Developer/MoreScreen';
import NotificationScreen from './Developer/NotificationScreen';
import Settings from './Developer/Settings';

const HomeScreen = () => {
  const { path, url } = useRouteMatch();
  return (
    <div className='border-t-2'>
      <div className='grid grid-cols-5'>
        <div className='col-span-1 border-r-2 h-screen'>
          <ul className='text-gray-600'>
            <Link to='/h'>
              <CustomSVG
                d={
                  'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                }
                text={'Ask Question'}
              />
            </Link>
            <Link to={`${url}/freelance`}>
              <CustomSVG
                d={
                  'M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z'
                }
                text={'Freelance'}
              />
            </Link>
            <Link to={`${url}/jobs`}>
              <CustomSVG
                d={
                  'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                }
                text={'Jobs'}
              />
            </Link>
            <Link to={`${url}/people`}>
              <CustomSVG
                d={
                  'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                }
                text={'Find People'}
              />
            </Link>
            <Link to={`${url}/notification`}>
              <CustomSVG
                d={
                  'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                }
                text={'Notification'}
              />
            </Link>
            <Link to={`${url}/settings`}>
              <CustomSVG
                d={
                  'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                }
                d1={'M15 12a3 3 0 11-6 0 3 3 0 016 0z'}
                text={'Settings'}
              />
            </Link>
            <Link to={`${url}/more`}>
              <CustomSVG
                d={
                  'M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z'
                }
                text={'More'}
              />
            </Link>
          </ul>
        </div>
        <div className='col-span-4 h-screen'>
          <div className='relative feed_right_content h-full'>
            <Switch>
              <Route exact path={path} component={AskQuestionsScreen} />
              <Route
                path={`${path}/askQuestion`}
                component={AskQuestionsScreen}
              />
              <Route path={`${path}/freelance`} component={FreelanceScreen} />
              <Route path={`${path}/jobs`} component={JobsScreen} />
              <Route path={`${path}/people`} component={FindPeopleScreen} />
              <Route path={`${path}/notification`} component={NotificationScreen} />
              <Route path={`${path}/settings`} component={Settings} />
              <Route path={`${path}/more`} component={MoreScreen} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
