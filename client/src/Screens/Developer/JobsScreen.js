import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import JobsContainer from '../../Container/JobsContainer';
import SingleJobContainer from '../../Container/SingleJobContainer';

const JobsScreen = () => {
  const { path } = useRouteMatch();
  return (
    <div>
      <div className='grid grid-cols-4 h-full'>
        <div className='col-span-4 md:col-span-3'>
          <div className='mb-2 text-xl text-gray-500 bg-gray-100 w-full font-bold p-3'>
            Jobs
          </div>
          <div className='job_feed px-2'>
            <Switch>
              <Route exact path={path} component={JobsContainer} />
              <Route
                path={`${path}/:circularId`}
                component={SingleJobContainer}
              />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsScreen;
