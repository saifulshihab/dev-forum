import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import JobsContainer from '../../Container/JobsContainer';
import SingleJobContainer from '../../Container/SingleJobContainer';

const JobsScreen = () => {
  const { path } = useRouteMatch();
  return (
    <div>
      <div className='grid grid-cols-4 h-full'>
        <div className='col-span-3'>
          <div className='mb-2 text-lg text-gray-600 bg-gray-100 flex items-center h-10 shadow font-semibold p-2'>
            <i className='fas fa-briefcase mr-2'></i>
            Job Circular
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
