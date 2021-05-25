import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import FreelanceProjectContainer from '../../Container/FreelanceProjectContainer';
import SingleFreelanceProjectContainer from '../../Container/SingleFreelanceProjectContainer';

const FreelanceScreen = () => {
  const { path } = useRouteMatch();
  return (
    <div>
      <div className='grid grid-cols-4 h-full'>
        <div className='col-span-3'>
          <div className='mb-2 text-xl text-gray-500 bg-gray-100 w-full font-bold p-3'>
            Projects
          </div>
          <div className='job_feed px-2'>
            <Switch>
              <Route exact path={path} component={FreelanceProjectContainer} />
              <Route
                path={`${path}/:projectId`}
                component={SingleFreelanceProjectContainer}
              />
            </Switch>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default FreelanceScreen;
